import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { axios } from '@/server/axios';

let session;

const username = process.env.EMAIL;
const password = process.env.VPAY_PASS;

const logMeIn = async () => {
  return await axios({
    provider: 'vpay',
    url: '/api/service/v1/query/merchant/login',
    rawBody: {
      username,
      password,
    },
  });
};

export async function POST() {
  try {
    session = await prisma.session.findFirst({
      where: {
        id: 'session',
      },
    });

    const date1 = dayjs(new Date());

    const date2 = dayjs(session.updated_at);

    const diffInMins = date1.diff(date2, 'm');

    if (diffInMins >= 4) {
      const { data } = await logMeIn();

      await prisma.session.update({
        where: { id: 'session' },
        data: {
          token: data.token,
        },
      });

      session = data;
    }

    return NextResponse.json({ session });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
