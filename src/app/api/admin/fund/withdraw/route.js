import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { isAdmin } from '@/server/utils/auth';
import { calc_user_balance } from '@/server/helpers';

const select = {
  id: true,
  role: true,
  email: true,
  balance: true,
  last_name: true,
  first_name: true,
  amount_spent: true,
  transaction_pin: true,
};

export async function POST(request) {
  const body = await request.json();

  const { email, amount, pin, ...rest } = body;

  const new_amount = Number(amount);

  try {
    const query = prisma.user.findUnique({
      where: {
        email,
      },
      select,
    });

    const authOptions = { body, prisma, query, isUser: true };

    const authRes = await isAdmin(authOptions);

    if (authRes.error) {
      const { statusCode, msg } = authRes;

      return NextResponse.json({ msg }, { status: statusCode });
    }

    const { queryRes: user } = authRes;

    const { balance, first_name, last_name } = user;

    const { new_balance, new_amount_spent } = calc_user_balance(
      user,
      new_amount
    );

    const fundUserData = {
      balance: new_balance,
      amount_spent: new_amount_spent,
      transactions: {
        create: {
          new_balance,
          type: 'funding',
          amount: new_amount,
          status: 'successful',
          channel: 'Withdraw',
          balance_before: balance,
          ...rest,
        },
      },
    };

    await prisma.user.update({
      where: { email },
      data: fundUserData,
    });

    return NextResponse.json({
      api_response: `You've successfully withdrew ₦${amount} from ${first_name} ${last_name} wallet.`,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error!' }, { status: 500 });
  }
}
