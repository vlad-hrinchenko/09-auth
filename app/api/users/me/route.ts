export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { nextServer } from '@/lib/api/api'; 
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

export async function GET() {
  try {
    const cookieHeader = cookies().toString();

    const res = await nextServer.get('/users/me', {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieHeader = cookies().toString();
    const body = await request.json();

    const res = await nextServer.patch('/users/me', body, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
