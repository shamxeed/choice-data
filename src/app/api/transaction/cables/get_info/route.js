import { NextResponse } from 'next/server';

import { axios } from '@/server/axios';
import { get_cable_id } from '../helpers';

export async function POST(req) {
  const body = await req.json();

  const { type, account } = body;

  console.log(type, account);

  try {
    const id = get_cable_id({ type });

    const data = await axios({
      // provider: 'alrahuz',
      url: `/validateiuc/?smart_card_number=${account}&cablename=${id}`,
      method: 'get',
    });

    console.log(data);

    return NextResponse.json({ msg: 'Hi' });
  } catch (err) {
    console.log(err.message, 'eerr');
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
