"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
        
        {/* Adding the BOT9 script safely */}
        <Script
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
        />

        {/* Loading the bot script */}
        <Script
          id="bot9-script"
          src="https://sdk.chatwidget.in/bot.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
