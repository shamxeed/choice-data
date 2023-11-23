import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { authorization } from '@/server/utils/auth';

export async function POST(req) {
  const body = await req.json();

  const { provider, type, is_disabled, network } = body;

  try {
    const authRes = await authorization({ prisma, body });

    if (authRes.error) {
      const { msg, statusCode } = authRes;
      return NextResponse.json({ msg }, { status: statusCode });
    }

    const plans = await prisma.plan.findMany({
      where: {
        type,
        network,
        provider,
      },
      select: { id: true },
    });

    const ids = plans.map((i) => i.id);

    await prisma.plan.updateMany({
      where: {
        id: { in: ids },
      },
      data: { is_disabled },
    });

    return NextResponse.json({
      api_response: `You\'ve successfully ${
        is_disabled ? 'disabled' : 'enabled'
      } ${network}-${type}-bundles from ${provider}`,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'server error' }, { status: 500 });
  }
}
