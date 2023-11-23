import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import prisma from '@/server/prisma';
import { myData } from '@/server/helpers';

export async function POST(req) {
  const { email, password, pin, myId } = await req.json();

  try {
    const me = await prisma.user.findUnique({
      where: { email },
      select: { password: true },
    });

    const isMatch = await bcrypt.compare(password, me.password);

    if (!isMatch) {
      return NextResponse.json({ msg: 'Wrong password!' }, { status: 401 });
    }

    const user = await prisma.user.update({
      where: {
        id: myId,
      },
      data: {
        transaction_pin: pin,
      },
      select: myData,
    });

    return NextResponse.json({
      user,
      msg: "You've successfully set/change your pin.",
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
