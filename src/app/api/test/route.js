import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 30;

const wait = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({ msg: 'Hi from delay' });
    }, 29000);
  });
};

export async function POST() {
  try {
    const { msg } = await wait();

    return NextResponse.json({ msg });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
    d;
  }
}
