import { NextResponse } from 'next/server';

import fetch from '@/server/fetch';
import prismaEdge from '@/server/prismaEdge';
import { authorization } from '@/server/middleware/edgeAuth';
import { myData, calc_user_balance } from '@/server/helpers';

let userData;

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req) {
  const body = await req.json();

  const { amount } = body;

  try {
    const response = await authorization({ prismaEdge, body });

    const { error, user, myId, msg, statusCode } = response;

    if (error) {
      return NextResponse.json({ msg }, { status: statusCode });
    }

    const new_amount = amount + 50;

    const calcResults = calc_user_balance(user, new_amount);

    const { new_balance, new_amount_spent, balance } = calcResults;

    const { status, message } = await fetch({
      rawBody: body,
      url: '/electricity/vend',
    });

    const { description, details } = message;

    if (!status) {
      return NextResponse.json({ msg: description }, { status: 400 });
    }

    const { trans_id } = details;

    userData = await prismaEdge.user.update({
      where: { id: myId },
      data: {
        balance: new_balance,
        amount_spent: new_amount_spent,
        transactions: {
          create: {
            type: 'purchase',
            amount: new_amount,
            refrence: trans_id,
            service: 'Elctricity Token',
            status: 'successful',
            balance_before: balance,
            new_balance: new_balance,
          },
        },
      },
      select: myData,
    });
    const api_response = description + 'is successful!';

    return NextResponse.json({ api_response, userData });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
