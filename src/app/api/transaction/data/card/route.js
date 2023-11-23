import { NextResponse } from 'next/server';

import prismaEdge from '@/server/prismaEdge';
import * as helpers from '@/server/helpers';
import { authorization } from '@/server/middleware/edgeAuth';
import { getBundle } from '@/server/utils/bundle';
import fetch from '@/server/fetch';

let status = '';
let api_response = '';
let userData = undefined;
let pin;

export const runtime = 'edge';
export const maxDuration = 30;

const server_res = {
  network: 'MTN',
  data_plan: 5,
  plan_network: 'MTN  1.0GB----N235',
  data_pins: [
    {
      model: 'vtuapp.datarecharge_pin',
      pk: '2487',
      fields: {
        network: 'MTN',
        data_plan: 'MTN  1.0GB----N235',
        pin: '1608437590',
        serial: 'SN40137088A',
        load_code: '*347*119*pin#',
        available: true,
      },
    },
  ],
  amount: 235,
  name_on_card: 'kvdata',
  quantity: 1,
  id: 2487,
  Status: 'successful',
  previous_balance: '3171.0',
  after_balance: '2936.0',
  create_date: '2023-11-13T07:22:39.002831',
};

export async function POST(req) {
  const body = await req.json();

  const { network, id, customer_id, quantity } = body;

  try {
    const query = getBundle(prismaEdge, id);

    const authOptions = { prismaEdge, query, body, is_data: true };

    const authRes = await authorization(authOptions);

    const { error, user, myId, msg, statusCode, queryData } = authRes;

    if (error) {
      return NextResponse.json({ msg }, { status: statusCode });
    }

    const { plan, plan_id } = queryData;

    const { amount } = helpers.calc_amount({ user, plan: queryData });

    const calcResults = helpers.calc_user_balance(user, amount);

    const { new_balance, new_amount_spent, balance } = calcResults;

    try {
      const data = await fetch({
        url: '/data_pin/',
        rawBody: {
          network,
          quantity,
          data_plan: plan_id,
          name_on_card: '',
          customer_ref: customer_id,
        },
      });

      const { Status, data_pins } = data || {};

      const { fields } = data_pins[0] || {};

      const { load_code } = fields || {};

      status = Status;

      pin = fields.pin;

      api_response = `Please use ${load_code} to recharge your data pin.`;
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
              mobile_number: pin,
              service: 'Data Card',
              balance_before: balance,
              new_balance: new_balance,
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
      pin,
      userData,
      api_response,
    });
  } catch (err) {
    console.log(err.message, 'error');
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
