"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface User {
  lastname: string;
}

const Page = () => {
  const [currentuser, setCurrentUser] = useState<User | null>(null);
  const [refcode, setRefCode] = useState("");
  const instructorid = localStorage.getItem('instructorid')
  useEffect(() => {
    const storeuser = localStorage.getItem("currentinstructor");
    if (storeuser) setCurrentUser(JSON.parse(storeuser));
  }, []);

  useEffect(() => {
    const referralcode = localStorage.getItem("referralcode");
    if (referralcode) setRefCode(JSON.parse(referralcode));
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/instructor_signup/${refcode}`);
    alert("Referral link copied!");
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-6">

       
        <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6 text-center">
          <h1 className="text-2xl font-bold text-blue-950">Instructor Dashboard</h1>
          <p className="text-gray-700 mt-2">Manage your account and share your referral link</p>
        </div>

       
        <div className="bg-white/90 backdrop-blur-md shadow-md rounded-xl p-5 text-center">
          {currentuser ? (
            <p className="text-gray-800 text-lg font-semibold">Welcome, {currentuser.lastname}!</p>
          ) : (
            <p className="text-gray-500 text-lg">Loading...</p>
          )}
        </div>

        
        <div className="bg-white/90 backdrop-blur-md shadow-md rounded-xl p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="break-all">
            <p className="text-gray-700 font-medium mb-2">Your referral link:</p>
            <Link
              href={`http://localhost:3000/instructor_signup/${refcode}`}
              className="text-blue-600 underline break-all"
            >
              http://localhost:3000/instructor_signup/{refcode}
            </Link>
          </div>
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Copy Link
          </button>
        </div>

        
        <div className="bg-white/90 backdrop-blur-md shadow-md rounded-xl p-5 text-center">
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Your referral code:</span> {refcode}
          </p>
        </div>
        <Link
    href={`/instructor_onboarding/onboardingtrue=${instructorid}/testcourse`}
    className="inline-block px-6 py-2 bg-[#0A1F44] text-white font-semibold rounded-md shadow hover:bg-blue-800 transition"
  >
    Next
  </Link>
      </div>
    </div>
</>
      );
};

export default Page;
