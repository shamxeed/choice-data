import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { axios } from '@/server/axios';
import { myData } from '@/server/helpers';

const getCustomer = async (email, token) => {
  const { data } = await axios({
    token,
    method: 'get',
    provider: 'vpay',
    url: `/api/service/v1/query/customer/showByEmail?email=${email}`,
  });

  return data;
};

export async function POST(req) {
  const body = await req.json();

  const { email, token, phone, first_name, last_name } = body;

  try {
    await axios({
      token,
      provider: 'vpay',
      url: '/api/service/v1/query/customer/add',
      rawBody: {
        email,
        phone,
        contactfirstname: first_name,
        contactlastname: last_name,
      },
    });

    const { nuban } = await getCustomer(email, token);

    const userData = await prisma.user.update({
      where: { email },
      data: { nuban },
      select: myData,
    });

    return NextResponse.json({ userData });
  } catch (err) {
    console.log(err.message);

    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
