import { NextResponse } from 'next/server';

import prisma from '@/server/prisma';
import { isAdmin } from '@/server/utils/auth';

const select = {
  last_name: true,
  first_name: true,
};

const getText = (value, name) => {
  let text;

  const upgrade_options = ['MODERATOR', 'Wholeseller', 'Reseller'];

  if (upgrade_options.includes(value)) {
    text = `"Upgraded ${name} to ${value}"`;
  } else if (value === 'User') {
    text = `"Downgraded ${name} to ${value}"`;
  } else if (value === 'BLOCKED') {
    text = `"Blocked ${name}."`;
  } else {
    text = `"Verified ${name}."`;
  }

  return text;
};

export async function POST(request) {
  const body = await request.json();

  const { email, value, field } = body;

  if (field === 'password') {
    return NextResponse.json({ msg: 'Bad Request!' }, { status: 400 });
  }

  try {
    const query = prisma.user.findUnique({
      where: {
        email,
      },
      select,
    });

    const authOptions = { body, prisma, query, isUser: true };

    const authRes = await isAdmin(authOptions);

    if (authRes.error) {
      const { statusCode, msg } = authRes;

      return NextResponse.json({ msg }, { status: statusCode });
    }

    const { queryRes } = authRes;

    const { first_name, last_name } = queryRes;

    await prisma.user.update({
      where: { email },
      data: { [field]: value },
    });

    const name = `${first_name} ${last_name}`;

    const text = getText(value, name);

    return NextResponse.json({
      api_response: `You've successfully ${text}.`,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: 'Server error!' }, { status: 500 });
  }
}
