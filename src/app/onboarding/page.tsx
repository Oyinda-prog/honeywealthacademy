"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Navbar from "@/components/Navbar";

const Page = () => {
  const router = useRouter();
  const [userid, setUserid] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const storedId = localStorage.getItem("studentid");
    if (storedId) {
      setUserid(JSON.parse(storedId));
      // console.log(JSON.parse(storedId));
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      educationlevel: "",
      gender: "",
    },
    validationSchema: Yup.object({
      educationlevel: Yup.string().required("Education level is required"),
      gender: Yup.string(),
    }),
    onSubmit: async (values) => {
      const payload = {
        ...values,
        studentid: userid,
      };

      try {
        const response = await fetch(
          "http://localhost/nextjsbackendproject/studentonboarding.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();

        if (data.status) {
          router.push(`/onboarding/onboardingtrue=${userid}`);
        } else {
          setMsg(data.onboardingstatus);
          setTimeout(() => setMsg(""), 3000);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-white text-white flex items-center justify-center p-4">
      <form onSubmit={formik.handleSubmit} className="bg-[#0A1F44]/90 p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-2 text-amber-400">Student Onboarding</h1>

        <label className="font-semibold">What is your highest level of education</label>
        <div className="flex flex-col gap-2">
          {["High School", "Undergraduate", "Post Graduate", "Other"].map((level) => (
            <label key={level} className="flex items-center gap-3">
              <input
                type="radio"
                name="educationlevel"
                value={level}
                onChange={formik.handleChange}
                checked={formik.values.educationlevel === level}
                className="accent-amber-400"
              />
              <span>{level}</span>
            </label>
          ))}
        </div>

        <label className="font-semibold">Gender (Optional)</label>
        <select
          name="gender"
          onChange={formik.handleChange}
          value={formik.values.gender}
          className="border border-gray-300 text-black p-2 rounded"
        >
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>

        <button
          type="submit"
          className="bg-amber-400 text-[#0A1F44] font-semibold py-2 rounded hover:bg-amber-500 transition"
        >
          Submit
        </button>

        {msg && <div className="mt-2 text-red-400">{msg}</div>}
      </form>
    </div>
</>  );
};

export default Page;
