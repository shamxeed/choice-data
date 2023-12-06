import { NextResponse } from 'next/server';

import { axios } from '@/server/axios';

export async function POST(req) {
  const body = await req.json();

  const { meter_number, meter_type, disco_id } = body;

  try {
    const { data } = await axios({
      url: `/validatemeter?meternumber=${meter_number}&disconame=${disco_id}&mtype=${meter_type}`,
      rawBody: body,
    });

    const { invalid, name } = data;

    if (invalid) {
      return NextResponse.json({ msg: name }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
