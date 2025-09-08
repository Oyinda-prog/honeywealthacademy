"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";

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
          "http://localhost/nextjsbackendproject/studentlogin.php",
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
          const studentid = data.user.student_id;
          const invitercode = data.user.invitercode;
          localStorage.setItem("studentid", JSON.stringify(studentid));
          localStorage.setItem("currentstudent", JSON.stringify(data.user));
          localStorage.setItem("invitercode", JSON.stringify(invitercode));
          if (data.user.onboarding === 1) {
            route.push("/account");
          } else {
            route.push("/onboarding");
          }
        } else {
          setmsg("Incorrect Email or Password");
        }
      } catch (err) {
        setmsg('Smething went wrong, try again!'+err);
      }
      setTimeout(() => {
        setmsg('')
      }, 3000);
    },
    validationSchema: Yup.object({
      email: Yup.string().required(),
      password: Yup.string().required(),
    }),
  });

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
  

      <div className="w-full max-w-md bg-white border border-blue-900 shadow-md rounded-xl p-8">
                {msg && (
  <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
    {msg}
  </div>
)}
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Log in as a Student
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="email"
            className="w-full px-4 py-2 border border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
            onChange={formik.handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
            onChange={formik.handleChange}
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-950 text-white py-2 rounded-lg font-semibold shadow-sm transition duration-200"
          >
            Log in
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-900 font-medium hover:underline">
              Sign up
            </Link>
          </p>
          <p>
            <Link
              href="/forgot_password"
              className="text-sm text-blue-900 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Page;
