"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [referrals, setReferrals] = useState<number>(0);

  const inviterCode = JSON.parse(localStorage.getItem("referralcode")!);
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await fetch(
          "http://localhost/nextjsbackendproject/allreferrals.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ invitercode: inviterCode }),
          }
        );

        const data = await response.json();
        if (data.status) {
          setReferrals(data.allusers.length);
        } else {
          setReferrals(0);
          console.log(data.msg);
        }
      } catch (err) {
        console.error(err);
        setReferrals(0);
      }
    };

    fetchReferrals();
  }, []);

  return (  
  <>
  <Navbar/>
  <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-white text-white flex flex-col items-center justify-center p-6">
      <div className="bg-[#0A1F44]/90 p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-amber-400 mb-2">
          Welcome Back!
        </h1>
        <p className="text-white/90">
          You have successfully invited{" "}
          <span className="font-semibold text-amber-400">{referrals}</span>{" "}
          {referrals === 0 ? "friend" : "friends"} to our platform.
        </p>
        <div className="bg-white/10 p-4 rounded border border-white/20">
          <p className="font-medium">Referral Benefits:</p>
          <ul className="list-disc list-inside mt-2 text-white/90">
            <li>Earn rewards for each friend who joins.</li>
            <li>Track your referrals easily from your dashboard.</li>
            <li>Unlock exclusive content and perks.</li>
            <li>Earn 15% from every course purchased by your referrals.</li>
            <li className="flex flex-col gap-1">
  <span>Copy your referral code: {inviterCode}</span>
</li>
<li>Your referral link: 
  <Link
    href={`/signup/${inviterCode}`}
    className="text-amber-400 hover:underline break-all"
  >
    {`http://localhost:3000/signup/${inviterCode}`}
  </Link></li>



          </ul>
        </div>
        <button className="mt-4 bg-amber-400 text-[#0A1F44] font-semibold py-2 rounded hover:bg-amber-500 transition">
          Invite More Friends
        </button>
      </div>
    </div>
    </>
  );
};

export default Page;
