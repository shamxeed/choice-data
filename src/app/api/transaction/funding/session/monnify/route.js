import { NextResponse } from 'next/server';

import { axios } from '@/server/axios';

let session;

const logMeIn = async () => {
  return await axios({
    provider: 'monnify',
    url: '/api/v1/auth/login',
  });
};

export async function POST() {
  try {
    const { data } = await logMeIn();

    if (!data.requestSuccessful) {
      return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }

    session = data.responseBody;

    return NextResponse.json({ session });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
