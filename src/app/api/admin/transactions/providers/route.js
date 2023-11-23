import { NextResponse } from 'next/server';

import { axios } from '@/server/axios';

export async function POST(req) {
  const provider = req.nextUrl.searchParams.get('provider');

  try {
    const { data } = await axios({
      provider,
      url: '/data/',
      method: 'GET',
    });

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
