import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { authorization } from '@/server/middleware/auth';

let plan = '';

export async function POST(req) {
  const body = await req.json();

  const { network, bundle, pin, ...rest } = body;

  if (bundle) {
    plan = bundle;
  }

  try {
    const response = await authorization(prisma, body);

    const { error, myId, msg, statusCode } = response;

    if (error) {
      return NextResponse.json({ msg }, { status: statusCode });
    }

    await prisma.transaction.create({
      data: {
        ...rest,
        plan,
        user_id: myId,
        type: 'dispute',
        provider: network,
        status: 'pending',
      },
    });

    return NextResponse.json({
      msg: 'Your refund request has been successfully sent for processing.',
    });
  } catch (err) {
    console.log(err.message);

    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
