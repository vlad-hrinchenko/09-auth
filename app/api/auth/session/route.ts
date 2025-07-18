import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = await fetch("https://notehub-api.goit.study/auth/session", {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
    credentials: "include",
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
