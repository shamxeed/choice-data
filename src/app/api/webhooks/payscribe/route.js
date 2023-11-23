import prisma from '@/server/prisma';
import { NextResponse } from 'next/server';

const _body = {
  status: 'success',
  event_type: 'AIRTIME',
  transaction_status: 'success',
  trans_id: 'PS-at-shK1697613722778572H',
  ref: '2023010180821Musa',
  transaction_amount: '100.00',
  charge: '1.20',
  prev_balance: '7327.00',
  balance_after: '7327.00',
  product_name: 'MTN',
  description:
    'Transaction with id PS-at-shK1697613722778572H as been marked as SUCCESS',
  remark: 'You Have Topped Up N100.00 To 2348038197868. ',
  data: '*456*1*1*100*2348038197868*1*4792#',
  time_initiated: '18 Oct., 2023 8:22 am',
  time_updated: '18 Oct., 2023 8:22 am',
};

let _status = 'successful';

export async function POST(req) {
  const body = await req.json();

  try {
    const { trans_id, status, remark } = body;

    if (status !== 'success') {
      _status = status;
    }

    await prisma.transaction.update({
      where: {
        refrence: trans_id,
      },
      data: {
        status: _status,
        api_response: remark,
      },
    });

    return NextResponse.json({ msg: 'Hi to Payscribe!!' });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
