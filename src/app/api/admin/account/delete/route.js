import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { isAdmin } from '@/server/utils/auth';

export async function POST(req) {
  const body = await req.json();

  const { user } = body;

  try {
    const authRes = await isAdmin({ prisma, body });

    if (authRes.error) {
      const { statusCode, msg } = authRes;

      return NextResponse.json({ msg }, { status: statusCode });
    }

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return NextResponse.json({
      api_response: `Successfully deleted ${user.email}!`,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error!' }, { status: 500 });
  }
}
