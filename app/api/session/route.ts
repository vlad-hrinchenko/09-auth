// app/api/session/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://notehub-api.goit.study/users/me", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      return NextResponse.json({ valid: false }, { status: 200 });
    }

    const user = await res.json();

    return NextResponse.json({ valid: !!user.email }, { status: 200 });
  } catch {
    return NextResponse.json({ valid: false }, { status: 200 });
  }
}
