"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface FormikValues {
  firstname: string;
  lastname: string;
  email: string;
  dob: string;
  password: string;
  phonenumber: string;
  refcode: string | number;
  onboarding: boolean;
  invitercode: string;
}

const Page = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [msg, setMsg] = useState("");
  const [invitercode, setInvitercode] = useState("");

  useEffect(() => {
    if (params.id) setInvitercode(params.id);
  }, [params.id]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const generateRefCode = () =>
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    Math.floor(Math.random() * 10) +
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    Math.floor(Math.random() * 10) +
    alphabet[Math.floor(Math.random() * alphabet.length)];

  const totalref = generateRefCode();

  const formik = useFormik<FormikValues>({
    initialValues: {
      firstname: "",
      lastname: "",
      dob: "",
      phonenumber: "",
      email: "",
      password: "",
      refcode: totalref,
      onboarding: false,
      invitercode: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("This field is required"),
      lastname: Yup.string().required("This field is required"),
      dob: Yup.string().required("This field is required"),
      phonenumber: Yup.string().required("This field is required"),
      email: Yup.string()
        .required("This field is required")
        .email("You must enter a valid email address"),
      password: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "http://localhost/nextjsbackendproject/signup.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...values, invitercode }),
          }
        );
        const data = await response.json();

        if (data.status === true) {
          setMsg(
            "Your account has been created successfully and your referral code has been sent to your inbox or spam folder. You'll be redirected shortly"
          );
          setTimeout(() => {
            router.push("/student_login");
          }, 6000);
        } else {
          setMsg("Email exists");
          setTimeout(() => setMsg(""), 3000);
        }
      } catch (err) {
        setMsg("Error submitting form: " + err);
      }
    },
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-white text-white flex flex-col lg:flex-row mt-5">
       
        <div className="hidden lg:flex w-1/2 rounded-3xl bg-[#0A1F44] text-white flex-col justify-center items-center p-12">
          <h1 className="text-4xl font-bold mb-4">Honeywealth Academy</h1>
          <p className="text-lg text-blue-200 max-w-md text-center">
            Learn, grow, and earn while building your future. At{" "}
            <span className="font-semibold">Honeywealth Academy</span>, knowledge comes with opportunities.
          </p>
        </div>

   
        <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg space-y-5 text-black"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-2">
              Register as a Student
            </h2>
            <p className="text-center text-sm text-white/80 mb-6">
              Join Honeywealth Academy today
            </p>

            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <small className="text-red-500">{formik.errors.firstname}</small>

            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={formik.handleChange}
              className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <small className="text-red-500">{formik.errors.lastname}</small>

            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              onChange={formik.handleChange}
              className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <small className="text-red-500">{formik.errors.dob}</small>

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <small className="text-red-500">{formik.errors.email}</small>

            <input
              type="text"
              name="phonenumber"
              placeholder="Phone Number"
              onChange={formik.handleChange}
              className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <small className="text-red-500">{formik.errors.phonenumber}</small>

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <small className="text-red-500">{formik.errors.password}</small>

            <label className="text-md font-medium text-white">Enter Referral Code</label>
            <input
              type="text"
              name="invitercode"
              defaultValue={invitercode}
              onChange={formik.handleChange}
              className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-bg-[#0A1F44] text-white py-3 rounded-md font-semibold hover:bg-[#0A1F44] transition"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-white/80 mt-4">
              Already signed up?{" "}
              <Link href="/student_login" className="text-blue-500 font-medium hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>

        
        {msg && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-100 text-[#0A1F44] px-6 py-2 rounded-md shadow">
            {msg}
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
