// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import api from "@/lib/api/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const apiRes = await api.post("/auth/login", body);
    const cookieHeader = apiRes.headers["set-cookie"];

    if (!cookieHeader) {
      return NextResponse.json({ error: "No cookies set by API" }, { status: 401 });
    }

    const cookieArray = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];
    const response = NextResponse.json(apiRes.data, { status: 200 });

    for (const cookieStr of cookieArray) {
      const parsed = parse(cookieStr);
      const options = {
        path: parsed.Path || "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax" as const,
        expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
        maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
      };

      if (parsed.accessToken) {
        response.cookies.set("accessToken", parsed.accessToken, options);
      }

      if (parsed.refreshToken) {
        response.cookies.set("refreshToken", parsed.refreshToken, options);
      }
    }

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
