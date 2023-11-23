import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST() {
  try {
    return NextResponse.json({ msg: 'Hi from Saukie!!' });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
