import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID || "";
const client = twilio(accountSid, authToken);

// Handle POST requests for verification code
export async function POST(req: Request) {
  const { phoneNumber, verificationCode } = await req.json(); // Get data from request body

  try {
    // Verify the code
    const verificationCheck = await client.verify
      .services(serviceSid)
      .verificationChecks.create({
        to: phoneNumber,
        code: verificationCode,
      });

    // Check verification status
    if (verificationCheck.status === "approved") {
      return NextResponse.json({ success: true }); // Successful verification
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid code" },
        { status: 400 }
      ); // Invalid code
    }
  } catch (error) {
    console.error("Error verifying code:", error); // Log any error
    return NextResponse.json(
      { success: false, error: "Failed to verify code" },
      { status: 500 }
    ); // Handle error
  }
}
