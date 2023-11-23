import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import prisma from '@/server/prisma';
import { myData } from '@/server/helpers';
import { getBundle } from '@/server/utils/bundle';

export async function POST(req, res) {
  const body = await req.json();

  try {
    const { email, myEmail } = body;

    const getUsers = prisma.user.findMany({
      where: {
        email: {
          in: [email, myEmail],
        },
      },
      select: { ...myData },
    });

    const [users, bundles] = await prisma.$transaction([
      getUsers,
      getBundle(prisma),
    ]);

    const me = users.find((i) => i.email === myEmail);

    if (me.role !== 'Admin') {
      return NextResponse.json(
        { msg: 'UnAuthorized request!' },
        { status: 401 }
      );
    }

    const user = users.find((i) => i.email === email);

    if (!user) {
      return NextResponse.json(
        { msg: 'Invalid login credentials!' },
        { status: 401 }
      );
    }

    const SECRET_KEY = process.env.SECRET_KEY;

    const token = jwt.sign({ userId: user.id }, SECRET_KEY);

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
