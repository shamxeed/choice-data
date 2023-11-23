import { NextResponse } from 'next/server';

import { calc_user_balance, myData } from '@/server/helpers';
import { authorization } from '@/server/middleware/edgeAuth';
import prismaEdge from '@/server/prismaEdge';
import fetch from '@/server/fetch';
import { getNetworkId } from '@/client/utils/helpers';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(request) {
  const body = await request.json();

  const { id, network, mobile_number, amount, amountToPay, customer_id } = body;

  const network_id = getNetworkId(network);

  try {
    const query = prismaEdge.plan.findUnique({ where: { id } });

    let options = {
      body,
      prismaEdge,
    };

    if (id) {
      options = {
        ...options,
        query,
      };
    }

    const authRes = await authorization(options);

    const { error, myId, user, msg, statusCode, queryData } = authRes;

    if (queryData && queryData?.is_disabled) {
      return NextResponse.json(
        { msg: 'Airtime for this Network is currently been disabled' },
        { status: 400 }
      );
    }

    if (error) {
      return NextResponse.json({ msg }, { status: statusCode });
    }

    const { new_balance, new_amount_spent, balance } = calc_user_balance(
      user,
      amountToPay
    );

    try {
      const { api_response, Status: status } = await fetch({
        url: '/topup/',
        rawBody: {
          amount,
          mobile_number,
          Ported_number: true,
          network: network_id,
          customer_ref: customer_id,
          airtime_type: 'VTU',
        },
      });

      if (!status || status?.toLocaleLowerCase() === 'failed') {
        return NextResponse.json({ msg: api_response }, { status: 500 });
      }

      try {
        const userData = await prismaEdge.user.update({
          where: { id: myId },
          data: {
            balance: new_balance,
            amount_spent: new_amount_spent,
            airtime_transactions_count: {
              increment: 1,
            },
            transactions: {
              create: {
                status,
                new_balance,
                api_response,
                mobile_number,
                type: 'purchase',
                provider: network,
                service: 'Airtime Topup',
                balance_before: balance,
                amount: Number(amountToPay),
              },
            },
          },
          select: myData,
        });

        return NextResponse.json({
          userData,
          api_response,
        });
      } catch (err) {
        console.log(err.message);
        return NextResponse.json(
          {
            msg: '',
          },
          { status: 500 }
        );
      }
    } catch (err) {
      return NextResponse.json(
        {
          msg: err.message,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.log(err.message, 'error');
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
