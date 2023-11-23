import { NextResponse } from 'next/server';

import { calc_user_balance } from '@/server/helpers';
import prismaEdge from '@/server/prismaEdge';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req) {
  const body = await req.json();

  const { eventType, eventData } = body;

  if (eventType !== 'SUCCESSFUL_TRANSACTION') {
    return NextResponse.json({ msg: 'Bad Request!' }, { status: 400 });
  }

  const { transactionReference, customer, amountPaid } = eventData;

  const charge = (amountPaid * 1.5) / 100;

  const amountToFund = Number((amountPaid - charge).toFixed());

  let api_response = `Your wallet has been successfully credited with ₦${amountToFund.toLocaleString()} via Automated Funding`;

  try {
    const getSession = prismaEdge.session.findUnique({
      where: { id: transactionReference },
    });

    const getUser = prismaEdge.user.findUnique({
      where: { email: customer.email },
      select: {
        balance: true,
        referred_by: true,
        isBonusPaid: true,
        total_funding: true,
      },
    });

    const [session, user] = await prismaEdge.$transaction([
      getSession,
      getUser,
    ]);

    if (session) {
      return NextResponse.json(
        { msg: 'Transaction already recorded!' },
        { status: 400 }
      );
    }

    const result = calc_user_balance(user, amountToFund, true);

    const { new_balance, new_total_funding } = result;

    const { referred_by, isBonusPaid } = user;

    const fundUserData = {
      balance: new_balance,
      total_funding: new_total_funding,
      transactions: {
        create: {
          new_balance,
          api_response,
          type: 'funding',
          status: 'successful',
          amount: Number(amountToFund),
          channel: 'Automated Funding',
          balance_before: user.balance,
        },
      },
    };

    const fundUser = prismaEdge.user.update({
      where: { email: customer.email },
      data: fundUserData,
    });

    const createSession = prismaEdge.session.create({
      data: {
        id: transactionReference,
      },
    });

    const referralBonus = prismaEdge.user.update({
      where: { email: referred_by },
      data: {
        bonus: {
          increment: 100,
        },
      },
    });

    const options = [fundUser, createSession];

    if (referred_by && !isBonusPaid && new_total_funding >= 5000) {
      fundUserData.isBonusPaid = true;
      options.push(referralBonus);
    }

    await prismaEdge.$transaction(options);

    return NextResponse.json({ msg: 'Funded successfully!' });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error!' }, { status: 500 });
  }
}
