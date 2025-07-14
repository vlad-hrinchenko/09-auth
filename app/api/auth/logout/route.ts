import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch("https://notehub-api.goit.study/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
