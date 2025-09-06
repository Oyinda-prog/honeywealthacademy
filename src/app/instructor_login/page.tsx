'use client'
import React, { useState } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Link from 'next/link';

interface User {
  email: string;
  password: string;
}

const Page = () => {
  const [msg, setmsg] = useState('')

  const route = useRouter();

  const formik = useFormik<User>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "http://localhost/nextjsbackendproject/instructorlogin.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const data = await response.json();
        // console.log(data);

        if (data.status) {
          const instructorid = data.user.instructor_id;
          const refcode = data.user.refcode;
          const currentuser = data.user;

          localStorage.setItem("currentinstructor", JSON.stringify(currentuser));
          localStorage.setItem("instructorid", JSON.stringify(instructorid));
          localStorage.setItem("referralcode", JSON.stringify(refcode));

          if (data.user.adminteststatus == 1 && data.user.onboarding == 1) {
            route.push(`/app_center`);
          } else if (data.user.onboarding == 1) {
            route.push(`/instructor_onboarding/onboardingtrue=${instructorid}/testcourse`);
          } else {
            route.push("/instructor_onboarding");
          }
        } else {
          setmsg("Incorrect Email or Password");
        }
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setmsg('')
      }, 3000);
    },
    validationSchema: Yup.object({
      email: Yup.string().required(),
      password: Yup.string().required(),
    }),
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-indigo-900 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
         
          {msg && (
  <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
    {msg}
  </div>
)}

         
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Log in as an Instructor
        </h1>

        
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <input
            type="text"
            name="email"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            onChange={formik.handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            onChange={formik.handleChange}
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Log In
          </button>
        </form>

       
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link href="/instructor_signup" className="text-blue-700 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="mt-2">
            <Link href="/forgot-password" className="text-blue-700 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
