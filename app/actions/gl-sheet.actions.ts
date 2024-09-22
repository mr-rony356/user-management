"use server";
import { google } from "googleapis";

export async function getSheetData() {
  const glAuth = await google.auth.getClient({
    projectId: "bot9-434419",
    credentials: {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const glSheets = google.sheets({ version: "v4", auth: glAuth });

  const data = await glSheets.spreadsheets.values.get({
    spreadsheetId: "1EmjLvbZv674WU53dlh8c_d44C5buuS4FkjDma_CQviA",
    range: "Sheet1!A1:D", // Adjust range to match your sheet's structure
  });

  return { data: data.data.values };
}
