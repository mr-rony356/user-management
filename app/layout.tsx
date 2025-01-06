"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { useState } from "react";
import FrillWidget from "@/components/FrillWidget";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [ssoToken, setSsoToken] = useState(() => {
      if (typeof window !== 'undefined') {
        return localStorage.getItem("ssoToken");
        
      }
      return null;
    });
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
        <FrillWidget  />
      </body>
    </html>  );
}
