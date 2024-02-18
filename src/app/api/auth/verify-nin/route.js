import { NextResponse } from 'next/server';

import fetch from '@/server/fetch';
import prismaEdge from '@/server/prismaEdge';
import { myData } from '@/server/helpers';

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
  console.log('musa is coming', body.nin);

  const { email, nin } = body;

  if (nin?.trim()?.length <= 10) {
    return NextResponse.json({ msg: 'Invalid NIN provided!' }, { status: 500 });
  }

  try {
    const user = await prismaEdge.user.findUnique({
      where: { nin },
      select: { id: true },
    });

    if (user) {
      return NextResponse.json(
        { msg: 'A user with this NIN already exists!' },
        { status: 500 }
      );
    }

    const authRes = await logMeIn();

    if (!authRes.requestSuccessful) {
      return NextResponse.json({ msg: 'Auth Error!' }, { status: 500 });
    }

    const { accessToken } = authRes.responseBody;

    console.log(authRes, 'authRes');

    const response = await fetch({
      method: 'put',
      token: accessToken,
      provider: 'monnify',
      rawBody: { nin },
      url: `/api/v1/bank-transfer/reserved-accounts/${email}/kyc-info`,
    });

    const { requestSuccessful, responseMessage, responseBody } = response;

    if (!requestSuccessful) {
      return NextResponse.json({ msg: responseMessage }, { status: 400 });
    }

    const { accountName } = responseBody;

    const [last_name, first_name] = accountName.split(' ');

    const userData = await prismaEdge.user.update({
      where: { email },
      data: {
        nin,
        first_name,
        last_name,
        is_nin_verified: true,
      },
      select: myData,
    });

    return NextResponse.json({
      userData,
      api_response: 'Your NIN verification is Successful!',
    });
  } catch (err) {
    console.log(err.message);

    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
