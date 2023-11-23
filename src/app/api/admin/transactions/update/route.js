import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { authorization } from '@/server/utils/auth';

export async function POST(req) {
  const body = await req.json();

  const { id, pin, ...rest } = body;

  try {
    const authRes = await authorization({ prisma, body });

    const { error, msg, statusCode } = authRes;

    if (error) {
      return NextResponse.json({ msg }, { status: statusCode });
    }

    const transaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: rest,
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ transaction });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
