'use client'
import Navbar from '@/components/Navbar'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import * as Yup from 'yup'

interface Instructor {
  firstname: string,
  lastname: string,
  email: string,
  refcode: string | number,
  password: string,
  invitercode: string,
}

const Page = () => {
  const [msg, setmsg] = useState('')
  const route = useRouter()
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

  const first = alphabet[Math.floor(Math.random()*alphabet.length)]
  const second = alphabet[Math.floor(Math.random()*alphabet.length)]
  const third = alphabet[Math.floor(Math.random()*alphabet.length)]
  const fourth = Math.floor(Math.random()*10)
  const fifth = alphabet[Math.floor(Math.random()*alphabet.length)]
  const sixth = alphabet[Math.floor(Math.random()*alphabet.length)]
  const seventh = Math.floor(Math.random()*10)
  const eigth = alphabet[Math.floor(Math.random()*alphabet.length)]
  const totalref = first+second+third+fourth+fifth+sixth+seventh+eigth

  const formik = useFormik<Instructor>({
    initialValues:{
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      refcode:totalref,
      invitercode:'',
    },
    onSubmit:async(values)=>{
      try{
        const response = await fetch('http://localhost/nextjsbackendproject/instruct.php',{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify(values),
        })
        const data = await response.json()
        if(data.status==true){
          setmsg("✅ Your account has been created successfully. Referral code sent to your email (check inbox/spam). Redirecting...")
          setTimeout(() => {
            route.push('/instructor_login')
          }, 4500);
        } 
        else{
          alert('Email exists')
        }   
        console.log(data);
      }
      catch(err){
        console.log(err);
      }
    },
    validationSchema:Yup.object({
      firstname:Yup.string().required(),
      lastname:Yup.string().required(),
      email:Yup.string().required().email('A valid email address is required'),
      password:Yup.string().required(),
    })
  })
  
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Instructor Sign Up
        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          
          <div>
            <input 
              type="text" 
              name="firstname" 
              placeholder="First Name" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
            />
            {formik.errors.firstname && <small className="text-red-500">{formik.errors.firstname}</small>}
          </div>

          <div>
            <input 
              type="text" 
              name="lastname" 
              placeholder="Last Name" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={formik.handleChange}
            />
            {formik.errors.lastname && <small className="text-red-500">{formik.errors.lastname}</small>}
          </div>

          <div>
            <input 
              type="email"  
              name="email" 
              placeholder="Email" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={formik.handleChange}
            />
            {formik.errors.email && <small className="text-red-500">{formik.errors.email}</small>}
          </div>

          <div>
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={formik.handleChange}
            />
            {formik.errors.password && <small className="text-red-500">{formik.errors.password}</small>}
          </div>

          <div>
            <input 
              type="text" 
              name="invitercode" 
              placeholder="Enter Referral Code" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={formik.handleChange}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-900 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Sign Up
          </button>
        </form>

        {msg && (
          <div className="mt-4 text-center text-green-600 font-medium">{msg}</div>
        )}
      </div>
    </div>
    </>
  )
}

export default Page
