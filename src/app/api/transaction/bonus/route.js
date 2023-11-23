import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { authorization } from '@/server/utils/auth';
import { calc_user_balance, myData } from '@/server/helpers';

let status = 'successful';
let service = 'Bonus Transfer';

export async function POST(req) {
  const body = await req.json();

  const { amount } = body;

  const new_amount = Number(amount);

  let api_response = `You've succeefully transferred ${amount} to your wallet from your bonus balance`;

  try {
    const authOptions = {
      select: {
        bonus: true,
        total_funding: true,
      },
      prisma,
      body,
      is_bonus: true,
    };

    const authRes = await authorization(authOptions);

    const { myId, error, msg, user, statusCode } = authRes;

    if (error) {
      return NextResponse.json({ msg }, { status: statusCode });
    }

    if (user.bonus < new_amount) {
      return NextResponse.json(
        { msg: 'Insufficient bonus balance!' },
        { status: 400 }
      );
    }

    const response = calc_user_balance(user, amount, true);

    const { balance, new_balance, new_total_funding } = response;

    const userData = await prisma.user.update({
      where: { id: myId },
      data: {
        balance: new_balance,
        bonus: user.bonus - amount,
        total_funding: new_total_funding,
        transactions: {
          create: {
            status,
            service,
            new_balance,
            api_response,
            type: 'funding',
            channel: 'Transfer',
            amount: new_amount,
            balance_before: balance,
          },
        },
      },
      select: myData,
    });

    return NextResponse.json({ api_response, userData });
  } catch (err) {
    console.log(err.message);

    return NextResponse.json(
      { api_response: 'Server error!' },
      { status: 500 }
    );
  }
}
