import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';

export async function POST() {
  try {
    const config =
      (await prisma.config.findUnique({
        where: { id: 'config' },
      })) || {};

    return NextResponse.json({
      config,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
