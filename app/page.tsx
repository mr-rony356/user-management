"use client";

import { getSheetData } from "@/app/actions/gl-sheet.actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Dashboard from "@/components/Dashboard";
import StripePayment from "@/components/StripePayment";

export default function Page() {
  const [response, setResponse] = useState<string[][] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<{ phoneNumber: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/auth");
      const data = await res.json();
      if (!data.isLoggedIn) {
        router.push("/login");
      } else {
        setUserData(data);
        setIsLoading(false);
      }
    };

    checkSession();
    handleOnGetSheetDataClick();
  }, [router]);

  const handleOnGetSheetDataClick = async () => {
    const sheetData: any = await getSheetData();
    console.log(sheetData);
    setResponse(sheetData.data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"
          role="status"
        ></div>
        <p className="ml-4 text-lg text-gray-700">Loading...</p>
      </div>
    );
  }
  const handleLogout = async () => {
    // Call the API to clear the session cookie
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      // Redirect to login page after successful logout
      router.push("/login");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-800 py-10 px-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {userData?.phoneNumber}
        </h1>

        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Please pay to continue using the service
        </h2>
        {/* <div>
          <StripePayment />
        </div> */}
        {/* {response && response.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-500 border border-gray-300 text-black">
              <thead>
                <tr className="bg-gray-200">
                  {response[0].map((header, index) => (
                    <th
                      key={index}
                      className="text-left px-4 py-2 font-semibold text-gray-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {response.slice(1).map((row, index) => (
                  <tr
                    key={index}
                    className="even:bg-gray-50 hover:bg-gray-100 transition duration-300"
                  >
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-2 border-t">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <p className="text-gray-600">Loading data .....</p>
          </div>
        )} */}
        {/* <Dashboard /> */}
        <iframe
          src="https://startup-founder.frill.co/embed/widget/a355a73a-680e-4fe7-a54b-d68f4395cd1f"
          sandbox="allow-same-origin allow-scripts allow-top-navigation allow-popups allow-forms allow-popups-to-escape-sandbox"
          style={{
            width: "100%",
            height: "1000px",
            border: "none",
            overflow: "hidden",
          }}
        ></iframe>
        {/* <button
          className="bg-red-500 text-white px-4  py-2 rounded-md hover:bg-red-600 mt-4"
          onClick={handleLogout}
        >
          Log Out
        </button> */}
      </div>
      {/* Adding the BOT9 script safely */}
      {/* <Script
        id="bot9-data"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              var BOT9_DATA = {
                bot9Id: "b0908786-8259-4fe7-b149-38c4d7345238",
                // user: {
                //   userId: '<unique_user_id>',
                //   emailId: '<user_email>',
                //   name: '<user_name>',
                //   customAttributes: {
                //     Field1: '',
                //     Field2: '',
                //     Field3: '',
                //   }
                // }
              };
            `,
        }}
      /> */}

      {/* Loading the bot script */}
      {/* <Script
        id="bot9-script"
        src="https://sdk.chatwidget.in/bot.js"
        strategy="afterInteractive"
      /> */}
    </div>
  );
}
