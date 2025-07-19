import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/api/api";
import { parse } from "cookie";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const apiRes = await api.post("/auth/login", body);

    const setCookie = apiRes.headers["set-cookie"];
    const response = NextResponse.json(apiRes.data);

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          path: parsed.Path || "/",
          httpOnly: true,
          secure: true,
          maxAge: Number(parsed["Max-Age"]),
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
        };

        if (parsed.accessToken) {
          response.cookies.set("accessToken", parsed.accessToken, options);
        }
        if (parsed.refreshToken) {
          response.cookies.set("refreshToken", parsed.refreshToken, options);
        }
      }
    }

    return response;
  } catch (error) {
    console.error("Login route failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
