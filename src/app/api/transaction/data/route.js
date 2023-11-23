import { NextResponse } from 'next/server';

import prismaEdge from '@/server/prismaEdge';
import * as helpers from '@/server/helpers';
import { getNetworkId } from '@/client/utils/helpers';
import { authorization } from '@/server/middleware/edgeAuth';
import { getBundle } from '@/server/utils/bundle';
import fetch from '@/server/fetch';

let status = '';
let api_response = '';
let userData = undefined;

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(request) {
  const body = await request.json();

  const { network, mobile_number, id, customer_id } = body;

  const network_id = getNetworkId(network);

  try {
    const query = getBundle(prismaEdge, id);

    const authOptions = { prismaEdge, query, body, is_data: true };

    const authRes = await authorization(authOptions);

    const { error, user, myId, msg, statusCode, queryData } = authRes;

    if (error) {
      return NextResponse.json({ msg }, { status: statusCode });
    }

    const { plan, plan_id, provider } = queryData;

    const { amount } = helpers.calc_amount({ user, plan: queryData });

    const calcResults = helpers.calc_user_balance(user, amount);

    const { new_balance, new_amount_spent, balance } = calcResults;

    try {
      const data = await fetch({
        url: '/data/',
        rawBody: {
          mobile_number,
          plan: plan_id,
          ref: customer_id,
          Ported_number: true,
          network: network_id,
          customer_ref: customer_id,
        },
        provider,
      });

      status = data?.Status;

      api_response = data?.api_response;
    } catch (err) {
      return NextResponse.json(
        {
          msg: err.message,
        },
        { status: 500 }
      );
    }

    const { transactionFailed } = helpers.checkStatus(status);

    if (transactionFailed) {
      return NextResponse.json({ msg: api_response }, { status: 500 });
    }

    try {
      userData = await prismaEdge.user.update({
        where: { id: myId },
        data: {
          balance: new_balance,
          amount_spent: new_amount_spent,
          data_transactions_count: {
            increment: 1,
          },
          transactions: {
            create: {
              plan,
              amount,
              status,
              api_response,
              type: 'purchase',
              provider: network,
              service: 'Data Bundle',
              balance_before: balance,
              new_balance: new_balance,
              mobile_number: mobile_number,
            },
          },
        },
        select: helpers.myData,
      });
    } catch (err) {
      console.log(err.message);
      return NextResponse.json({ msg: '' }, { status: 500 });
    }

    return NextResponse.json({
      userData,
      api_response,
    });
  } catch (err) {
    console.log(err.message, 'error');
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
