import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';

export async function POST() {
  try {
    const data = await prisma.plan.findMany();

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
