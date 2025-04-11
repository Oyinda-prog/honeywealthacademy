'use client'
import React from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
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
            console.log(data);
    
            if (data.status) {
              const instructorid = data.user.instructor_id;
              const refcode = data.user.refcode;
              const currentuser=data.user
              // const adminteststatus=data.user.adminteststatus
            

              localStorage.setItem("currentinstructor", JSON.stringify(currentuser));
            
              
              localStorage.setItem("instructorid", JSON.stringify(instructorid));
              localStorage.setItem("referralcode", JSON.stringify(refcode));
              // console.log(localStorage['instructorid']);
              
              if (data.user.adminteststatus== 1 && data.user.onboarding==1) {
                route.push(`/${instructorid}/app_center`);
              }
              else if(data.user.onboarding==1){
                route.push(`/instructor_onboarding/onboardingtrue=${instructorid}/testcourse`);
              }
               else {
                route.push("/instructor_onboarding");
              }
        
        

            } 
            else {
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
      })
  return (
    <>
    <h1>Onboarding login page</h1>
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
    </>
  )
}

export default Page