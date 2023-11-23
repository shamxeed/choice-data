import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { calc_user_balance, retry } from '@/server/helpers';
import { getUserId } from '@/server/middleware/auth';
import { getBundle } from '@/server/utils/bundle';

let status = 'processing';

export async function POST(request) {
  const body = await request.json();

  const { network, mobile_number, id, isCoupon, api_response } = body;

  const service = isCoupon ? 'Data Coupon' : 'Data Bundle';

  const { myId } = getUserId();

  try {
    const getUser = prisma.user.findUnique({
      where: { id: myId },
      select: {
        balance: true,
        amount_spent: true,
        transaction_pin: true,
      },
    });

    const [user, bundle] = await prisma.$transaction([
      getUser,
      getBundle(prisma, id),
    ]);

    const { amount, plan } = bundle;

    const calcResults = calc_user_balance(user, amount);

    const { new_balance, new_amount_spent, balance } = calcResults;

    const retryOpts = {
      prisma,
      plan,
      amount,
      network,
      status,
      service,
      mobile_number,
      ...calcResults,
    };

    try {
      await prisma.user.update({
        where: { id: myId },
        data: {
          balance: new_balance,
          amount_spent: new_amount_spent,
          data_transactions_count: {
            increment: 1,
          },
          transactions: {
            create: {
              plan,
              amount,
              status,
              service,
              api_response,
              type: 'purchase',
              provider: network,
              balance_before: balance,
              new_balance: new_balance,
              mobile_number: mobile_number,
            },
          },
        },
      });
    } catch (err) {
      console.log(err.message);

      retry(retryOpts);

      return NextResponse.json({ msg: 'retrying...' });
    }

    return NextResponse.json({ msg: 'Success!' });
  } catch (err) {
    console.log(err.message, 'error');
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
