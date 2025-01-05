"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// You might want to move this to a separate file
const countries = [
  { name: "CAD", code: "+1" },
  { name: "UK", code: "+44" },
  { name: "India", code: "+91" },
  { name: "BD", code: "+880" },
  // Add more countries as needed
];

const LoginPage = () => {
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/auth");
      const data = await res.json();
      if (data.isLoggedIn) router.push("/");
    };

    checkSession();
  }, [router]);

  const sendVerificationCode = async () => {
    const fullPhoneNumber = countryCode + phoneNumber;
    const response = await fetch("/api/send-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
    });

    const data = await response.json();
    if (data.success) {
      setIsCodeSent(true);
    }
  };

  const verifyCode = async () => {
    const fullPhoneNumber = countryCode + phoneNumber;
    const verifyResponse = await fetch("/api/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: fullPhoneNumber, verificationCode }),
    });

    const verifyData = await verifyResponse.json();

    if (verifyData.success) {
      const loginResponse = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
      });

      const loginData = await loginResponse.json();
      router.push("/");

      if (!loginData.success) {
        router.push("/");
      } else {
        console.error("Login failed");
        // You might want to show an error message to the user here
      }
    } else {
      console.error("Verification failed");
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Verify Your Number Please
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your contact details to proceed.
        </p>

        {!isCodeSent ? (
          <div className="space-y-4">
            <div className="flex">
              <select
                className="w-1/4 border text-black font-bold border-gray-300 rounded-l-md text-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name} ({country.code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                className="w-2/3 border border-l-0 border-gray-300 rounded-r-md text-black text-sm p-2 focus:ring font-bold focus:ring-blue-200 focus:ring-opacity-50"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone number"
              />
            </div>
            <button
              onClick={sendVerificationCode}
              className="w-full bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition"
            >
              Send Code
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md text-sm p-2 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
            />
            <button
              onClick={verifyCode}
              className="w-full bg-green-600 text-black  text-sm py-2 rounded-md hover:bg-green-700 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition"
            >
              Verify Code
            </button>
          </div>
        )}

        <p className="mt-4 text-center text-xs text-gray-500">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
