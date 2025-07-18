import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/auth/session";

  const res = await fetch(apiUrl!, {
    method: "GET",
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
    credentials: "include",
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}