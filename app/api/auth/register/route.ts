import { NextRequest, NextResponse } from "next/server";
import { axiosConfig } from "@/lib/api/api";
import { parse } from "cookie";
import { isAxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await axiosConfig.post("/auth/register", body, {
      withCredentials: true,
    });

    const setCookieHeader = apiRes.headers["set-cookie"];
    const response = NextResponse.json(apiRes.data, {
      status: apiRes.status,
    });

    if (setCookieHeader) {
      const cookieArray = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          path: parsed.Path ?? "/",
          maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          httpOnly: true,
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
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
