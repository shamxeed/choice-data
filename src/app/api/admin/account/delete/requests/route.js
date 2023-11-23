import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';

const select = {
  id: true,
  email: true,
  phone: true,
  balance: true,
  bonus: true,
  last_name: true,
  first_name: true,
  updated_at: true,
  created_at: true,
};

export async function POST() {
  try {
    const data = await prisma.user.findMany({
      where: {
        role: 'DELETED',
      },
      take: 20,
      select,
    });

    return NextResponse.json({ data });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error!' }, { status: 500 });
  }
}
