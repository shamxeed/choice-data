import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { isAdmin } from '@/server/utils/auth';

const upsert = async (id, body) => {
  const data = {
    ...body,
    api_discount: Number(body.api_discount),
    reseller_discount: Number(body.reseller_discount),
  };

  if (id) {
    return await prisma.plan.update({
      where: { id },
      data,
    });
  }
  return await prisma.plan.create({ data });
};

export async function POST(req) {
  const body = await req.json();

  const { id, pin, service, text, ...rest } = body;

  try {
    const authRes = await isAdmin({ prisma, body });

    if (authRes.error) {
      const { msg, statusCode } = authRes;
      return NextResponse.json({ msg }, { status: statusCode });
    }

    await upsert(id, rest);

    const data = await prisma.plan.findMany();

    return NextResponse.json({
      data,
      api_response: `You\'ve successfully created/updated  ${text}`,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'server error' }, { status: 500 });
  }
}
