import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { hashPassword } from '@/server/hashPassword';
import { myData } from '@/server/helpers';
import { getBundle } from '@/server/utils/bundle';

const emailErr =
  "The email you're trying to use is associated with another account!";

const phoneErr = 'This phone number has already been taken use another!';

export async function POST(req) {
  const body = await req.json();

  const { email, phone, password: thePass } = body;

  try {
    const lookup = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            phone,
          },
        ],
      },
      select: {
        email: true,
      },
    });

    if (lookup) {
      if (lookup.email === email) {
        return NextResponse.json({ msg: emailErr }, { status: 400 });
      } else {
        return NextResponse.json({ msg: phoneErr }, { status: 400 });
      }
    }

    const password = await hashPassword(thePass);

    const getUser = prisma.user.create({
      data: {
        ...body,
        password,
      },
      select: myData,
    });

    const [user, bundles] = await prisma.$transaction([
      getUser,
      getBundle(prisma),
    ]);

    const SECRET_KEY = process.env.SECRET_KEY;

    const token = jwt.sign({ userId: user?.id }, SECRET_KEY);

    return NextResponse.json({
      token,
      user,
      bundles,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error!' }, { status: 500 });
  }
}
