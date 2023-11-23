import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';

let data = [];

export async function GET(req) {
  const type = req.nextUrl.searchParams.get('type');

  const cursor = req.nextUrl.searchParams.get('cursor');

  let request = {
    where: {
      type,
    },
    take: 20,
    orderBy: {
      created_at: 'desc',
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  };

  try {
    if (cursor) {
      data = await prisma.transaction.findMany({
        ...request,
        skip: 1,
        cursor: {
          id: cursor,
        },
      });
    } else {
      data = await prisma.transaction.findMany(request);
    }

    const next_cursor = data[19]?.id;

    return NextResponse.json({ data, next_cursor });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
