"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// You might want to move this to a separate file
const countries = [
  { name: "Canada", code: "+1" },
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

      if (loginData.success) {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please Enter Your Contact Number to continue
        </p>

        {!isCodeSent ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex mb-4">
              <select
                className="block w-[25%] rounded-l-md border-gray-300 text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                className="block w-2/3 rounded-r-md  border-gray-300 text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone number"
              />
            </div>
            <button
              onClick={sendVerificationCode}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
              Send Verification Code
            </button>
          </div>
        ) : (
          <div>
            <label className="block text-lg  mb-2 text-black font-bold">
              Verification Code
            </label>
            <input
              type="text"
              className="block border border-black text-black w-full rounded-md p-4 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-4"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter the 6-digit code"
            />
            <button
              onClick={verifyCode}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
            >
              Verify Code
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
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
