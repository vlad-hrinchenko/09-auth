import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookie = request.headers.get("cookie") || "";

  const response = await fetch("https://notehub-api.goit.study/auth/session", {
    headers: { cookie },
    credentials: "include",
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
