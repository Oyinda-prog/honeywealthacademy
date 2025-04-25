"use client";
// import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  email: string;
  password: string;
}
const Page = () => {
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
        console.log(data.status);

        if (data.status) {
          const studentid = data.user.student_id;
          const invitercode = data.user.invitercode;
          localStorage.setItem("studentid", JSON.stringify(studentid));
          localStorage.setItem("currentstudent", JSON.stringify(data.user));
          localStorage.setItem("invitercode", JSON.stringify(invitercode));
          if (data.user.onboarding === 1) {
            route.push('/')
            // route.push(`/onboarding/onboardingtrue=${studentid}`);
          } else {
            route.push("/onboarding");
          }
        } else {
          alert("Incorrect login details");
        }
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required(),
      password: Yup.string().required(),
    }),
  });

  return (
    <>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="email"
            className="border border-amber-500"
            onChange={formik.handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            className="border border-amber-500"
            onChange={formik.handleChange}
             placeholder="password"
          />
          <button type="submit" className="border border-amber-500">
            Log in
          </button>
        </form>
      </div>
      <p>Already have an account? <Link href='/signup'>Sign up</Link></p>
    </>
  );
};

export default Page;
