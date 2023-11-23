import { NextResponse } from 'next/server';

import fetch from '@/server/fetch';

export const runtime = 'edge';
export const maxDuration = 30;

export async function GET(req) {
  const biller = req.nextUrl.searchParams.get('biller');

  try {
    const data = await fetch({
      method: 'get',
      url: `/bouquets/?service=${biller}`,
    });

    const packages = data.message.details;

    return NextResponse.json({ packages });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
