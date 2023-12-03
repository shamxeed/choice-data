import { NextResponse } from 'next/server';

import { axios } from '@/server/axios';
import { get_cable_id } from '../helpers';

export async function POST(req) {
  const body = await req.json();

  const { type, account } = body;

  try {
    const id = get_cable_id({ type });

    const { data } = await axios({
      provider: 'subandgain',
      url: `/verify_bills.php?username=shamxeed&apiKey=sag2f5j7hlioma4tgaaf4wz6wknurr3nf793fx432mafn1faq5pvs&service=${id}&smartNumber=${account}`,
    });

    return NextResponse.json({ data });
  } catch (err) {
    console.log(err.message, 'eerr');
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
