import { NextResponse } from 'next/server';
import prisma from '@/server/prisma';

const api_response = 'Account found!';

export async function GET(req) {
  const email = req.nextUrl.searchParams.get('email');

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        first_name: true,
        is_email_verified: true,
      },
    });

    if (!user) {
      return NextResponse.json({ msg: 'No Account Found!' }, { status: 400 });
    } else if (!user.is_email_verified) {
      return NextResponse.json(
        {
          msg: 'This email can not receive an OTP, because it is not verified!',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ api_response, user });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
