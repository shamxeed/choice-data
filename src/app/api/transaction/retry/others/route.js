import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { calc_user_balance } from '@/server/helpers';
import { getUserId } from '@/server/middleware/auth';

let status = 'processing';

export async function POST(request) {
  const body = await request.json();

  const { network, mobile_number, service, amount, api_response, amountToPay } =
    body;

  const { myId } = getUserId();

  const new_amount = amount ? Number(amount) : Number(amountToPay);

  try {
    const user = await prisma.user.findUnique({
      where: { id: myId },
      select: {
        balance: true,
        amount_spent: true,
        transaction_pin: true,
      },
    });

    const calcResults = calc_user_balance(user, new_amount);

    const { new_balance, new_amount_spent, balance } = calcResults;

    try {
      await prisma.user.update({
        where: { id: myId },
        data: {
          balance: new_balance,
          amount_spent: new_amount_spent,
          transactions: {
            create: {
              status,
              service,
              api_response,
              type: 'purchase',
              provider: network,
              amount: new_amount,
              balance_before: balance,
              new_balance: new_balance,
              mobile_number: mobile_number,
            },
          },
        },
      });
    } catch (err) {
      console.log(err.message);
      return NextResponse.json({ msg: '' }, { status: 500 });
    }

    return NextResponse.json({ msg: 'Success!' });
  } catch (err) {
    console.log(err.message, 'error');
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
