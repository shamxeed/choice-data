import { NextResponse } from 'next/server';

import fetch from '@/server/fetch';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST() {
  try {
    const kvdata = await fetch({
      url: '/user/',
      method: 'GET',
      provider: 'kvdata',
    });

    return NextResponse.json({ kvdata });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error!' }, { status: 500 });
  }
}
