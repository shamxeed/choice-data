import { NextResponse } from 'next/server';

import prismaEdge from '@/server/prismaEdge';
import { myData, calc_user_balance } from '@/server/helpers';
import { authorization } from '@/server/middleware/edgeAuth';
import fetch from '@/server/fetch';
import { get_cable_numeric_id } from '../helpers';

export const runtime = 'edge';
export const maxDuration = 30;

let userData;

export async function POST(req) {
  const body = await req.json();

  const { id, amount, plan, account } = body;

  const api_response = `Your request to purchase ${plan} at ₦${amount} is successful!`;

  try {
    const query = prismaEdge.plan.findUnique({
      where: { id },
    });

    const authOptions = { prismaEdge, query, body, is_plan: true };

    const authRes = await authorization(authOptions);

    const { error, user, myId, msg, statusCode, queryData } = authRes;

    if (error) {
      return NextResponse.json({ msg }, { status: statusCode });
    }

    const amount_with_charges = amount + 20;

    const calcResults = calc_user_balance(user, amount_with_charges);

    const { new_balance, new_amount_spent, balance } = calcResults;

    const { plan_id, type } = queryData;

    const cablename = get_cable_numeric_id({ type });

    /*  await fetch({
      url: '/cablesub/',
      rawBody: {
        cablename,
        cableplan: plan_id,
        smart_card_number: account,
      },
    }); */

    userData = await prismaEdge.user.update({
      where: { id: myId },
      data: {
        balance: new_balance,
        amount_spent: new_amount_spent,
        transactions: {
          create: {
            plan,
            new_balance,
            api_response,
            type: 'purchase',
            status: 'successful',
            mobile_number: account,
            balance_before: balance,
            amount: amount_with_charges,
            service: 'Cable TV Subscription',
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
