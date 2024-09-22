import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID || ""; // Your service SID
const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  const { phoneNumber } = await req.json(); // Get the phone number from the request body

  try {
    // Create a verification
    const verification = await client.verify
      .services(serviceSid)
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
      });

    console.log(verification.status); // Log the verification status
    return NextResponse.json({ success: true, status: verification.status });
  } catch (error) {
    console.error("Error sending verification:", error); // Log the error
    return NextResponse.json(
      { success: false, error: "Failed to send verification code" },
      { status: 500 }
    );
  }
}
