import prisma from '@/server/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  const { pins, plan_id } = body;

  try {
    const card = await prisma.card.findUnique({
      where: { id: plan_id },
    });

    if (card) {
      const new_pins = card.pin + ',' + pins;

      await prisma.card.update({
        where: { id: plan_id },
        data: {
          pin: new_pins,
        },
      });
    } else {
      await prisma.card.create({
        data: {
          id: plan_id,
          pin: pins,
        },
      });
    }

    return NextResponse.json({
      msg: 'Successfully loaded pins!',
    });
  } catch (err) {
    console.log(err.message);

    return NextResponse.json({ msg: 'server error' }, { status: 500 });
  }
}
