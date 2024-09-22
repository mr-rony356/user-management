"use server";
import { google } from "googleapis";

export async function getSheetData() {
  const glAuth = await google.auth.getClient({
    projectId: "bot9-434419",
    credentials: {
      type: "service_account",
      project_id: "bot9-434419",
      private_key_id: "6eb9920b7978650393f8579d8715f740d885244a",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBXUjofPtknJmM\nYQUenbXGoGEmnHSRGfyEfJx3GQTICD4lVgQgd37IRrEhpBRce3H2J9MZaTHoi/bb\nI7eP89rHCa/9Iw0mtrzogxoYPeM2X09LSdHp3LklErnDVshdAfNj6jUsjdpqfn2n\nW4azOnB3sOXolG4cLOIPbmB92tUSvufPVXRZj4vceGV7Q89cUk5DCNhIBK5svjjO\nzrzs8EGTV+0VXBGrAJb68mFxp4d7Yr+tTf90timQ61gCwl3l4J8yNHqndmnto3xH\nVr1ZGq+k4ER8ZdcJSR1aaC8TzVE+zB6L/G7kwNIGs8jfaE6gUNywAtteSEXuVKwF\n03RcvPXdAgMBAAECggEACRUO3N6r9y6U1r9i3GyHcngrgAMGxZ79GaL5vW1XKGcc\ntie7Y2QBeDo7zSr2Ct8AfBGkTHQAtF3In0Pm9hO74a/ujHsGPdyE9H3d7qgPgUkK\nQizKN4wWxStDPu3XVOkHy9hfHYPfL7PXxpHZupbi2/ha4CkCn/+qsZNbZGXwLqRk\ne9+w+2XHnkNuqShc1H+YELSoJcFGTNYFznFxHmrISnk1d7dQDma8MDYjeJQEo/JZ\n1oILRcbmSPdX3CcbNiXarDJtFo1RHe12K0oX805fPlxHEFUT/aVXYh9ACTaZn5JN\n0GmYVaPtHBv8Glo/T2gxSKdKJ1FjyCziEtNoerOtyQKBgQDfCHKO4Q3bgom6gQo5\nUXz+kuerm2/u8FkR4DQBau/hTGwgEsC99bO9z6qjzbjVt2N9kW6m01RMZjXVszZA\nl6fzpllIYVjcV5v2brIU2DiLRW7QcdfmFNciKNR/3WG1nW38Uiz9WOG8jcvcj4Zm\nKvZVPfTRhwt4Rl1yw0tmSCch1QKBgQDd8i3xdbLmYjPzLV5zGqlajr3TjOGWSihu\nL45GAjULEywXcsWX4o8PcCeP1ymTxF8/YE445bqYTBwLSEtHTZeYmfcTAYiiNhJ+\nEgEt3ZBTQhBNlucmQ+bYXykYsEPpIAMOxKkQRC7b63TpBRFm6t1EnXsvxoSWI34I\nZ4UuZrz/6QKBgEalb1wQr4oDfErmSu3DARvGPrnd34PI//2ojfCRBfDQe0NhjUne\nhROvrvZ52H1hvJLuuSUAtagJjC3nuVyWbS3BWHCT3UjWO2HAyInPv4Fl+ebu2JtZ\nqJd6ZW0nG6ciec893GBXghFuvM9daw37t9FicaTY6OotJ7aNY9m/Kx4NAoGBANrF\n1bOlKOse8cZKekdLiJPTEBpvTA4wmxnBlqQ7mL2J8HRMlajZkdrN2rFWjY0yjBCU\nhYZgLEXi/+G/KTTnrv6lBX6ejGgYlLHgXXkwZQssm5Vfogl99RZi9sd3N/mbrGfq\nQhvembH9rgfjDvw7llAES2EUdazo31q5b/YFH1fBAoGBALHNXzd04CmS4MDdET/f\nX8NfEVmkoEAuQvTMiWzKup1JMc/n8zzvGv06HxxzbHmC98AI3/uxaOongeTJXGcB\nnMKwK1UiilNHOssMCo0FahcfdDLfsTHzNKpQmyVNrXAi/+WJqkWLUCT4F3l8mV+c\npJnD8UU2C67Mhyg3kSx8UVA8\n-----END PRIVATE KEY-----\n",
      client_email: "bot9-785@bot9-434419.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
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
