import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import prisma from '@/server/prisma';
import { calc_discount, myData } from '@/server/helpers';
import { getBundle } from '@/server/utils/bundle';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const getUser = prisma.user.findFirst({
      where: { email },
      select: { ...myData, password: true },
    });

    const [user, bundles] = await prisma.$transaction([
      getUser,
      getBundle(prisma),
    ]);

    if (!user) {
      return NextResponse.json(
        { msg: 'Invalid login credentials!' },
        { status: 401 }
      );
    }

    if (user.role === 'DELETED') {
      return NextResponse.json(
        {
          msg: "Oops!! You can't access your account as you requested it to be deleted!! If you want to restore it please send us mail at support@saukie.net.",
        },
        { status: 401 }
      );
    }

    if (user.role === 'BLOCKED') {
      return NextResponse.json(
        {
          msg: 'You are blocked from using our services!! Send us mail at support@saukie.net for assisstance!!',
        },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { msg: 'Invalid login cridentials!' },
        { status: 401 }
      );
    }

    const discount = ['Reseller', 'API'];

    const { role } = user;

    if (discount.includes(role)) {
      calc_discount({ role, bundles });
    }

    const SECRET_KEY = process.env.SECRET_KEY;

    const token = jwt.sign({ userId: user.id }, SECRET_KEY);

    delete user.password;

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
