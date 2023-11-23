import { NextResponse } from 'next/server';

import { axios } from '@/server/axios';

export async function GET() {
  try {
    const { data } = await axios({
      method: 'get',
      url: `/epins`,
    });

    let vouchers = [];

    data.message.details.forEach((i) => {
      vouchers = [...vouchers, ...i.collection].filter((i) => i.available >= 1);
    });

    return NextResponse.json({ vouchers });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
