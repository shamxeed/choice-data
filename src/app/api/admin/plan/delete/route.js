import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { authorization } from '@/server/utils/auth';

export async function POST(req) {
  const body = await req.json();

  const { id } = body;

  try {
    const query = prisma.plan.findUnique({ where: { id } });

    const authRes = await authorization({ prisma, body, query });

    if (!authRes.queryData) {
      return NextResponse.json(
        { msg: 'Record does not exist!' },
        { status: 404 }
      );
    }

    if (authRes.error) {
      const { msg, statusCode } = authRes;
      return NextResponse.json({ msg }, { status: statusCode });
    }

    await prisma.plan.delete({ where: { id } });

    return NextResponse.json({
      api_response: `You\'ve successfully deleted a plan with an ID: ${id}`,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'server error' }, { status: 500 });
  }
}
