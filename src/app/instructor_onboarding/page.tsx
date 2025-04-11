"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const Page = () => {
  const route = useRouter();
  const [userid, setuserid] = useState("");
const [msg, setmsg] = useState('')
  useEffect(() => {
    if (localStorage["instructorid"]) {
     setuserid(JSON.parse(localStorage.getItem("instructorid")!));
    
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      gender: "",
      dob: "",
      phonenumber: "",
      qualification:'',
      bio:'',
      facebook:'',
      linkedln:'',
      onboarding: false,
      
    },
    onSubmit: async (values) => {
      // alert(12)
      const payload = {
        ...values,
        instructorid: userid,
      };
      // console.log(payload);

      try {
        const response = await fetch(
          "http://localhost/nextjsbackendproject/instructoronboarding.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const data = await response.json();
        console.log(data);

        if (data.status) {
        // console.log(data);
        route.push(`/instructor_onboarding/onboardingtrue=${userid}`);
        }
          else{
            setmsg(data.onboardingstatus)
          }

      } catch (err) {
        console.log(err);
        
        
      }
    },
    validationSchema: Yup.object({
      gender: Yup.string().required(),
      dob: Yup.string().required(),
      phonenumber: Yup.string().required(),
      qualification:Yup.string().required(),
      bio:Yup.string().required(),
      facebook:Yup.string().required(),
      linkedln:Yup.string().required(),
    }),
  });
  return (
    <>
      <form action="" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="linkedln"
          placeholder="Linkedln profile link"
          onChange={formik.handleChange}
          className="text-red-200 border border-amber-200"
        />
        <small className="text-red-400">{formik.errors.linkedln}</small>
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          className="text-red-200 border border-amber-200"
          onChange={formik.handleChange}
        />
        <small className="text-red-400">{formik.errors.dob}</small>
        <input
          type="text"
          name="phonenumber"
          placeholder="Phone Number"
          className="border border-amber-500"
          onChange={formik.handleChange}
        />
        <small className="text-red-400">{formik.errors.phonenumber}</small>
        <input
          type="text"
          name="facebook"
          placeholder="Facebook Profile Link"
          className="border border-amber-500"
          onChange={formik.handleChange}
        />
        <small className="text-red-400">{formik.errors.facebook}</small>
        <textarea
          name="bio"
          className="border border-amber-500"
          id=""
          placeholder="A short bio about you ...."
          onChange={formik.handleChange}
        ></textarea>
        <small className="text-red-400">{formik.errors.bio}</small>
        <label htmlFor="">Gender</label>
        <select
          name="gender"
          id=""
          className="border border-amber-500"
          onChange={formik.handleChange}
        >
          <option value=""></option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
        <small className="text-red-400">{formik.errors.gender}</small>
        <label htmlFor="">What is your highest level of education</label>
        
        <select
          name="qualification"
          id=""
          className="border border-amber-500"
          onChange={formik.handleChange}
        >
          <option value=""></option>
          <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
          <option value="Male">High School</option>
          <option value="Others">Others</option>
        </select>
        <small className="text-red-400">{formik.errors.qualification}</small>
        <button type="submit" className="border border-amber-700">
          Submit
        </button>
      </form>
      <div>{msg}</div>
    </>
  );
};

export default Page;
