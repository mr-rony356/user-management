import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Load the SSO key from environment variables
const FrillSSOKey = process.env.FRILL_SSO_KEY;

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { email, id, name } = await req.json();

    if (!email || !id || !name) {
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }

    // Create the Frill user token
    const userData = { email, id, name };
    const frillUserToken = jwt.sign(userData, FrillSSOKey!, {
      algorithm: "HS256",
    });

    // Return the generated token
    return NextResponse.json({ token: frillUserToken });
  } catch (error) {
    console.error("Error generating Frill token:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
