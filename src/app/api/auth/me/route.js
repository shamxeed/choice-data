import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { calc_discount, myData } from '@/server/helpers';
import { getUserId } from '@/server/middleware/auth';
import { getBundle } from '@/server/utils/bundle';

export async function GET() {
  const { myId } = getUserId();

  if (!myId) {
    return NextResponse.json({ msg: 'Invalid credentials!' }, { status: 401 });
  }

  try {
    const getMe = prisma.user.findUnique({
      where: { id: myId },
      select: myData,
    });

    const [me, bundles] = await prisma.$transaction([getMe, getBundle(prisma)]);

    const discount = ['Reseller', 'API'];

    const { role } = me;

    if (discount.includes(role)) {
      calc_discount({ role, bundles });
    }

    return NextResponse.json({
      me,
      bundles,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error!' }, { status: 500 });
  }
}
