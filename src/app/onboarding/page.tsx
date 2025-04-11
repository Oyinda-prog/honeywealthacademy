"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

const Page = () => {
  const route = useRouter();
  const [userid, setuserid] = useState("");
  const [msg, setmsg] = useState("");

  useEffect(() => {
    if (localStorage["studentid"]) {
      setuserid(JSON.parse(localStorage.getItem("studentid")!));
      console.log(userid);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      educationlevel: "",
      gender: "",
    },
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
          route.push(`/onboarding/onboardingtrue=${userid}`);
        } else {
          setmsg(data.onboardingstatus);
          setTimeout(() => {
            setmsg("");
          }, 3000);
        }
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: Yup.object({
      educationlevel: Yup.string().required(),
      gender: Yup.string().required(),
    }),
  });

  return (
    <>
      <form action="" onSubmit={formik.handleSubmit}>
        <label htmlFor="">What is your highest level of education</label>
        <input
          type="radio"
          name="educationlevel"
          value="High School"
          onChange={formik.handleChange}
        />
        <span>High School</span>
        <input
          type="radio"
          name="educationlevel"
          value="Undergraduate"
          onChange={formik.handleChange}
        />{" "}
        <span>Undergraduate</span>
        <input
          type="radio"
          name="educationlevel"
          value="Post Graduate"
          onChange={formik.handleChange}
        />
        <span>Post Graduate </span>
        <input type="radio" name="educationlevel" value="Other" />{" "}
        <span>Other</span>
        <label htmlFor="">Gender(Optional)</label>
        <select name="gender" id="" onChange={formik.handleChange}>
          <option value=""></option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
        <button type="submit" className="border border-amber-700">
          Submit
        </button>
      </form>
      <div>{msg}</div>
    </>
  );
};

export default Page;
