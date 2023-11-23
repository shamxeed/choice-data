import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { calc_user_balance } from '@/server/helpers';
import { isAdmin } from '@/server/utils/auth';

const getQuery = (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      balance: true,
      last_name: true,
      first_name: true,
      amount_spent: true,
      total_funding: true,
    },
  });
};

export async function POST(request) {
  const body = await request.json();

  const { transaction, pin, ...rest } = body;

  const { user_id, id, amount, mobile_number } = transaction;

  try {
    const query = getQuery(user_id);

    const authOptions = {
      body,
      prisma,
      query,
      isUser: true,
      select: {
        first_name: true,
        last_name: true,
      },
    };

    const authRes = await isAdmin(authOptions);

    if (authRes.error) {
      const { statusCode, msg } = authRes;

      return NextResponse.json({ msg }, { status: statusCode });
    }

    const { queryRes: user, user: me } = authRes;

    const { balance, first_name, last_name, amount_spent } = user;

    const { new_balance } = calc_user_balance(user, amount, true);

    const new_amount_spent = amount_spent - amount;

    const api_response = `You've been successfully refunded by an admin ${me.first_name} ${me.last_name} for a failed order on ${mobile_number}`;

    const refundOpts = {
      balance: new_balance,
      amount_spent: new_amount_spent,
      transactions: {
        create: {
          amount,
          new_balance,
          api_response,
          type: 'funding',
          channel: 'Refund',
          status: 'successful',
          balance_before: balance,
          ...rest,
        },
      },
    };

    const refund = prisma.user.update({
      where: { id: user_id },
      data: refundOpts,
    });

    const updateTransaction = prisma.transaction.update({
      where: { id },
      data: {
        status: 'failed',
        api_response,
      },
    });

    await prisma.$transaction([refund, updateTransaction]);

    const msg = `You've successfully refunded ${first_name} ${last_name} with ₦${amount}.`;

    return NextResponse.json({
      msg,
      api_response,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error!' }, { status: 500 });
  }
}
