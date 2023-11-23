import { NextResponse } from 'next/server';

import fetch from '@/server/fetch';

let response;

const contractCode = process.env.MONNIFY_CONTRACT_CODE;

export const runtime = 'edge';
export const maxDuration = 30;

const logMeIn = async () => {
  return await fetch({
    provider: 'monnify',
    url: '/api/v1/auth/login',
  });
};

export async function POST(req) {
  const body = await req.json();

  const { email, first_name, last_name } = body;

  const name = `${first_name} ${last_name}`;

  try {
    const authRes = await logMeIn();

    if (!authRes.requestSuccessful) {
      return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }

    const { accessToken } = authRes.responseBody;

    const getResponse = await fetch({
      method: 'get',
      token: accessToken,
      provider: 'monnify',
      url: `/api/v2/bank-transfer/reserved-accounts/${email}`,
    });

    response = getResponse;

    const { requestSuccessful, responseMessage } = getResponse;

    if (responseMessage === 'Cannot find reserved account') {
      const postResponse = await fetch({
        token: accessToken,
        provider: 'monnify',
        url: `/api/v2/bank-transfer/reserved-accounts`,
        rawBody: {
          contractCode,
          accountName: name,
          customerName: name,
          currencyCode: 'NGN',
          customerEmail: email,
          accountReference: email,
          getAllAvailableBanks: false,
          preferredBanks: ['035', '50515'],
        },
      });

      response = postResponse;
    } else if (!requestSuccessful) {
      return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }

    const { responseBody } = response;

    return NextResponse.json(responseBody);
  } catch (err) {
    console.log(err.message, 'error');

    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
