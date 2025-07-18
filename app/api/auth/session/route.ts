import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiUrl = "https://09-auth-two.vercel.app/api/auth/session";

  const response = await fetch(apiUrl, {
    headers: {
      Cookie: request.headers.get("cookie") || "",
    },
    credentials: "include",
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
