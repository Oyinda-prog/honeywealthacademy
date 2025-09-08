"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const Page = () => {
  const route = useRouter();
  const [userid, setUserid] = useState("");
  const [msg, setMsg] = useState("");
const id=JSON.parse(localStorage.getItem("instructorid")!) || 0
  useEffect(() => {
console.log(id);

    if (localStorage["instructorid"]) {
      setUserid(JSON.parse(localStorage.getItem("instructorid")!));
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      gender: "",
      dob: "",
      phonenumber: "",
      qualification: "",
      bio: "",
      facebook: "",
      linkedln: "",
      onboarding: false,
    },
    onSubmit: async (values) => {
      const payload = { ...values, instructorid: id };
      try {
        const response = await fetch(
          "http://localhost/nextjsbackendproject/instructoronboarding.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        const data = await response.json();

        console.log(data);
        if (data.status) {
          
          route.push(`/instructor_onboarding/onboardingtrue=${userid}`);
        } else {
          setMsg(data.onboardingstatus);
        }
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: Yup.object({
      gender: Yup.string().required(),
      dob: Yup.string().required(),
      phonenumber: Yup.string().required(),
      qualification: Yup.string().required(),
      bio: Yup.string().required(),
      facebook: Yup.string().required(),
      linkedln: Yup.string().required(),
    }),
  });

  const inputCardClass =
    "bg-white/90 shadow-md rounded-xl p-4 mb-4 focus-within:ring-2 focus-within:ring-blue-500 transition";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl p-8">
        <h2 className="text-4xl font-bold text-white text-center mb-6">
          Instructor Onboarding
        </h2>
        <p className="text-center text-gray-100 mb-8 text-lg">
          Complete your profile to start creating courses
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
         
          <div className={inputCardClass}>
            <input
              type="text"
              name="linkedln"
              placeholder="LinkedIn Profile Link"
              onChange={formik.handleChange}
              className="w-full bg-transparent outline-none"
            />
            <small className="text-red-500">{formik.errors.linkedln}</small>
          </div>

        
          <div className={inputCardClass}>
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              onChange={formik.handleChange}
              className="w-full bg-transparent outline-none"
            />
            <small className="text-red-500">{formik.errors.dob}</small>
          </div>

        
          <div className={inputCardClass}>
            <input
              type="text"
              name="phonenumber"
              placeholder="Phone Number"
              onChange={formik.handleChange}
              className="w-full bg-transparent outline-none"
            />
            <small className="text-red-500">{formik.errors.phonenumber}</small>
          </div>

       
          <div className={inputCardClass}>
            <input
              type="text"
              name="facebook"
              placeholder="Facebook Profile Link"
              onChange={formik.handleChange}
              className="w-full bg-transparent outline-none"
            />
            <small className="text-red-500">{formik.errors.facebook}</small>
          </div>

          
          <div className={inputCardClass}>
            <textarea
              name="bio"
              placeholder="A short bio about you..."
              onChange={formik.handleChange}
              className="w-full bg-transparent outline-none resize-none"
              rows={4}
            />
            <small className="text-red-500">{formik.errors.bio}</small>
          </div>

        
          <div className={inputCardClass}>
            <label className="font-medium text-[#0A1F44] text-lg mb-2 block">Gender</label>
            <select
              name="gender"
              onChange={formik.handleChange}
              className="w-full bg-transparent outline-none"
            >
              <option value=""></option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
            <small className="text-red-500">{formik.errors.gender}</small>
          </div>

         
          <div className={inputCardClass}>
            <label className="font-medium text-lg text-[#0A1F44] mb-2 block">
              Highest Level of Education
            </label>
            <select
              name="qualification"
              onChange={formik.handleChange}
              className="w-full bg-transparent outline-none"
            >
              <option value=""></option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="High School">High School</option>
              <option value="Others">Others</option>
            </select>
            <small className="text-red-500">{formik.errors.qualification}</small>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A1F44] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

        {msg && (
          <div className="mt-6 text-center text-red-500 font-medium">{msg}</div>
        )}
      </div>
    </div>
  );
};

export default Page;
