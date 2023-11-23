import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { calc_user_balance } from '@/server/helpers';
import { isAdmin } from '@/server/utils/auth';

const getQuery = (phone) => {
  return prisma.user.findUnique({
    where: {
      phone,
    },
    select: {
      balance: true,
      last_name: true,
      first_name: true,
      referred_by: true,
      isBonusPaid: true,
      amount_spent: true,
      total_funding: true,
    },
  });
};

export async function POST(request) {
  const body = await request.json();

  const { phone, amount, pin, ...rest } = body;

  const new_amount = Number(amount);

  const isRefund = rest.channel === 'Refund';

  try {
    const query = getQuery(phone);

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

    const {
      balance,
      first_name,
      last_name,
      referred_by,
      isBonusPaid,
      amount_spent,
    } = user;

    const { new_balance, new_total_funding: total_funding } = calc_user_balance(
      user,
      amount,
      true
    );

    const new_amount_spent = isRefund
      ? amount_spent - new_amount
      : amount_spent;

    const new_total_funding = isRefund
      ? total_funding - new_amount
      : total_funding;

    const api_response = `You've been successfully ${
      isRefund ? 're' : ''
    }funded by an admin ${me.first_name} ${me.last_name}`;

    const fundUserData = {
      balance: new_balance,
      amount_spent: new_amount_spent,
      total_funding: new_total_funding,
      transactions: {
        create: {
          new_balance,
          api_response,
          type: 'funding',
          amount: new_amount,
          status: 'successful',
          channel: 'Manual Funding',
          balance_before: balance,
          ...rest,
        },
      },
    };

    const fundUser = prisma.user.update({
      where: { phone },
      data: fundUserData,
    });

    const options = [fundUser];

    const referralBonus = prisma.user.update({
      where: { email: referred_by },
      data: {
        bonus: {
          increment: 100,
        },
      },
    });

    if (!isRefund && referred_by && !isBonusPaid && new_total_funding >= 5000) {
      fundUserData.isBonusPaid = true;
      options.push(referralBonus);
    }

    await prisma.$transaction(options);

    return NextResponse.json({
      api_response: `You've successfully ${
        isRefund ? 'refunded' : 'funded'
      } ${first_name} ${last_name} with ₦${amount}.`,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error!' }, { status: 500 });
  }
}
