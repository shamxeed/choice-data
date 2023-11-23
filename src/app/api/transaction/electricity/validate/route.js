import { NextResponse } from 'next/server';

import { axios } from '@/server/axios';

export async function POST(req) {
  const body = await req.json();

  try {
    const { data } = await axios({
      url: '/electricity/validate',
      rawBody: body,
    });

    const { description, details } = data.message;

    return NextResponse.json({ description, details });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
