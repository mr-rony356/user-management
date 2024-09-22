// app/api/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || "fallback_secret_key"
);

export async function POST(request: NextRequest) {
  const { phoneNumber } = await request.json();

  // Here you would typically verify the phone number
  // For this example, we'll assume it's valid

  const token = await new SignJWT({ phoneNumber })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET_KEY);

  cookies().set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const session = cookies().get("session")?.value;

  if (!session) {
    return NextResponse.json({ isLoggedIn: false });
  }

  try {
    const { payload } = await jwtVerify(session, SECRET_KEY);
    return NextResponse.json({
      isLoggedIn: true,
      phoneNumber: payload.phoneNumber,
    });
  } catch {
    return NextResponse.json({ isLoggedIn: false });
  }
}
