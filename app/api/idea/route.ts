// app/api/frill/ideas/route.ts
import { NextRequest, NextResponse } from "next/server";

const FRILL_API_URL = "https://api.frill.co/v1/ideas";
const FRILL_API_KEY = "503753b7-7e0e-4674-8682-130ca5a29704"; // Add your API key to .env.local

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(FRILL_API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${FRILL_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from Frill API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
