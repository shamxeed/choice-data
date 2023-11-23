import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { provider } from '@/constants/Bundles';

export async function GET() {
  try {
    const data = await prisma.bundle.findMany({
      where: {
        provider,
        is_disabled: false,
      },
    });

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
