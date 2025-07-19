export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import api from "@/lib/api/api";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  try {
    const { data } = await api.get("/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  const cookieStore = cookies();
  const body = await request.json();

  try {
    const { data } = await api.patch("/users/me", body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Update failed", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
