import { NextResponse } from 'next/server';
import { getUserId } from '@/server/middleware/auth';
import prisma from '@/server/prisma';

export async function GET(req) {
  const query = req.nextUrl.searchParams.get('query');

  const cursor = req.nextUrl.searchParams.get('cursor');

  const { myId } = getUserId();

  if (!myId) {
    return NextResponse.json({ msg: 'Unauthorised request!' }, { status: 401 });
  }

  let data = [];

  let request = {
    where: {
      OR: [
        {
          first_name: {
            contains: query,
          },
        },
        {
          last_name: {
            contains: query,
          },
        },
        {
          email: query,
        },
        {
          phone: query,
        },
      ],
    },
    take: 20,
    orderBy: {
      created_at: 'desc',
    },
  };

  try {
    if (cursor) {
      data = await prisma.user.findMany({
        ...request,
        skip: 1,
        cursor: {
          id: cursor,
        },
      });
    } else {
      data = await prisma.user.findMany(request);
    }

    const next_cursor = data[19]?.id;

    return NextResponse.json({ data, next_cursor });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
