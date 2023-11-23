import { NextResponse } from 'next/server';

import { axios } from '@/server/axios';
import prisma from '@/server/prisma';
import { authorization } from '@/server/middleware/auth';
import { myData, calc_user_balance } from '@/server/helpers';
import * as mailer from '@/server/mailer';

let userData;

const email = process.env.MY_EMAIL;

export async function POST(req) {
  const body = await req.json();

  const { amount } = body;

  try {
    const response = await authorization(prisma, body);

    const { error, user, myId, msg, statusCode } = response;

    if (error) {
      return NextResponse.json({ msg }, { status: statusCode });
    }

    const calcResults = calc_user_balance(user, amount);

    const { new_balance, new_amount_spent, balance } = calcResults;

    const { data } = await axios({
      rawBody: body,
      url: '/epins/vend',
    });

    const { description, details } = data.message;

    const { trans_id } = details;

    userData = await prisma.user.update({
      where: { id: myId },
      data: {
        balance: new_balance,
        amount_spent: new_amount_spent,
        transactions: {
          create: {
            amount,
            type: 'purchase',
            refrence: trans_id,
            status: 'successful',
            balance_before: balance,
            new_balance: new_balance,
            service: 'Educational Voucher',
          },
        },
      },
      select: myData,
    });

    const api_response = description + 'is successful!';

    const html = mailer.createHTMLTamplate('Musa', data.message);

    const mailOption = {
      html,
      to: email,
      from: mailer.sender,
      subject: 'Educational Voucher',
    };

    await mailer.sendMailAsync(mailOption);

    return NextResponse.json({ api_response, userData });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
