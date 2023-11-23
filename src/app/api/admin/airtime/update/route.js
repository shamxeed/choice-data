import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { authorization } from '@/server/utils/auth';

const upsert = async (id, data, found) => {
  if (found) {
    return await prisma.plan.update({
      where: { id },
      data,
    });
  }
  return await prisma.plan.create({ data });
};

export async function POST(req) {
  const body = await req.json();

  const { id, title } = body;

  const { pin, ...rest } = body;

  try {
    const query = prisma.plan.findUnique({ where: { id } });

    const authRes = await authorization({ prisma, body, query });

    if (authRes.error) {
      const { msg, statusCode } = authRes;
      return NextResponse.json({ msg }, { status: statusCode });
    }

    await upsert(id, rest, authRes.queryData);

    const data = await prisma.plan.findMany();

    return NextResponse.json({
      data,
      api_response: `You\'ve successfully created/updated airtime for ${title}`,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'server error' }, { status: 500 });
  }
}
