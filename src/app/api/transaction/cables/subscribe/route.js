import { NextResponse } from 'next/server';

import prismaEdge from '@/server/prismaEdge';
import { myData, calc_user_balance } from '@/server/helpers';
import { authorization } from '@/server/middleware/edgeAuth';
import fetch from '@/server/fetch';

export const runtime = 'edge';
export const maxDuration = 30;

let userData;

export async function POST(req) {
  const body = await req.json();

  const { amount, plan } = body;

  console.log(body);

  const api_response = `Your request to purchase ${plan} at ₦${amount} is successful!`;

  try {
    const response = await authorization(prismaEdge, body);

    const { error, user, myId, msg, statusCode } = response;

    if (error) {
      return NextResponse.json({ msg }, { status: statusCode });
    }

    const new_amount = amount + 20;

    const calcResults = calc_user_balance(user, new_amount);

    const { new_balance, new_amount_spent, balance } = calcResults;

    const data = await fetch({
      rawBody: body,
      url: '/multichoice/vend',
    });

    const { details } = data.message;

    const { trans_id } = details;

    userData = await prismaEdge.user.update({
      where: { id: myId },
      data: {
        balance: new_balance,
        amount_spent: new_amount_spent,
        transactions: {
          create: {
            plan,
            api_response,
            type: 'purchase',
            amount: new_amount,
            refrence: trans_id,
            service: 'Cable TV Subscription',
            status: 'successful',
            balance_before: balance,
            new_balance: new_balance,
          },
        },
      },
      select: myData,
    });

    return NextResponse.json({ api_response, userData });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
