import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/app/api/api";
import { parse } from "cookie";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken) {
    return NextResponse.json({});
  }

  if (refreshToken) {
    const apiRes = await api.get("/auth/session", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      let newAccessToken = "";
      let newRefreshToken = "";

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        if (parsed.accessToken) newAccessToken = parsed.accessToken;
        if (parsed.refreshToken) newRefreshToken = parsed.refreshToken;
      }

      if (newAccessToken) cookieStore.set("accessToken", newAccessToken);
      if (newRefreshToken) cookieStore.set("refreshToken", newRefreshToken);

      return NextResponse.json({});
    }
  }

  return NextResponse.json({});
}
