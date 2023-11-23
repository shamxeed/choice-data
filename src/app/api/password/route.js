import { NextResponse } from 'next/server';
import dayjs from 'dayjs';

import prisma from '@/server/prisma';
import { hashPassword } from '@/server/hashPassword';

let msg = 'server error';

export async function POST(req) {
  const body = await req.json();

  const { email, password, code } = body;

  try {
    const otp = await prisma.otp.findFirst({
      where: {
        code,
        is_valid: true,
        user_email: email,
      },
      select: {
        updated_at: true,
      },
    });

    if (!otp) {
      return NextResponse.json(
        { msg: 'Invalid or expired code!' },
        { status: 400 }
      );
    }

    const date1 = dayjs(new Date());

    const date2 = dayjs(otp.updated_at);

    const otpLifeSpan = date1.diff(date2, 'h');

    if (otpLifeSpan >= 2) {
      return NextResponse.json(
        { msg: 'Invalid or expired code!' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const updateUser = prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    const invalidateCode = prisma.otp.update({
      where: { user_email: email },
      data: { is_valid: false },
    });

    await prisma.$transaction([updateUser, invalidateCode]);

    return NextResponse.json({
      api_response: 'Password has been successfulyy changed!',
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg }, { status: 500 });
  }
}
