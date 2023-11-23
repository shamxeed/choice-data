import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';

export async function POST() {
  try {
    const data = await prisma.user.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take: 50,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        balance: true,
        referred_by: true,
        created_at: true,
        data_transactions_count: true,
        airtime_transactions_count: true,
        total_funding: true,
        amount_spent: true,
        updated_at: true,
      },
    });

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
1;
