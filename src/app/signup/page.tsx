'use client'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

interface formik{
firstname:string,
lastname:string,
email:string,
dob:string,
password:string,
phonenumber:string,
refcode:string|number,
onboarding:boolean,
invitercode:string
}
const Page = () => {
  const route=useRouter()
  const [msg, setmsg] = useState('')
  const alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  
  const first=alphabet[Math.floor(Math.random()*alphabet.length)]
  const second=alphabet[Math.floor(Math.random()*alphabet.length)]
  const third=alphabet[Math.floor(Math.random()*alphabet.length)]
  const fourth=Math.floor(Math.random()*10)
  const fifth=alphabet[Math.floor(Math.random()*alphabet.length)]
  const sixth=alphabet[Math.floor(Math.random()*alphabet.length)]
  const seventh=Math.floor(Math.random()*10)
  const eigth=alphabet[Math.floor(Math.random()*alphabet.length)]
  const totalref=first+second+third+fourth+fifth+sixth+seventh+eigth

  const formik=useFormik<formik>({
      initialValues:{
          firstname:'',
          lastname:'',
          dob:'',
          phonenumber:'',
          email:'',
          password:'',  
          refcode:totalref,
          onboarding:false,
          invitercode:''
      },
      onSubmit:async(values)=>{
          try{
              const response=await fetch('http://localhost/nextjsbackendproject/signup.php',{
                  method:'POST',
                  headers:{
                      "Content-Type":"application/json"
                  },
                  body:JSON.stringify(values)
              }) 
              const data=await response.json()
              
              if(data.status==true){
                  setmsg("Your account has been created successfully and your referral code has been sent to your inbox or spam folder. You'll be redirected shortly")
                  setTimeout(() => {
                      route.push('/student_login')
                  }, 6000);  
              } else {
                  setmsg('Email exists')
              }
          } catch(err){
              setmsg('Error submitting form'+err);
          }  
      },
      validationSchema:Yup.object({
          firstname:Yup.string().required('This field is required'),
          lastname:Yup.string().required('This field is required'),
          dob:Yup.string().required('This field is required'),
          phonenumber:Yup.string().required('This field is required'),
          email:Yup.string().required('This field is required').email('You must enter a valid email address'),
          password:Yup.string().required('This field is required')
      })
  })

  return (
    <>
    <Navbar/>
    <div className="min-h-screen  flex mt-20">
      
      <div className="hidden lg:flex w-1/2 rounded-3 bg-blue-900 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Honeywealth Academy</h1>
        <p className="text-lg text-blue-100 max-w-md text-center">
          Learn, grow, and earn while building your future.  
          At <span className="font-semibold">Honeywealth Academy</span>, 
          knowledge comes with opportunities.
        </p>
      </div>

      
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white px-6 py-12">
        <form 
          action="" 
          onSubmit={formik.handleSubmit} 
          className="w-full max-w-md space-y-5"
        >
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-2">Register As a student</h2>
          <p className="text-center text-sm text-gray-600 mb-6">Join Honeywealth Academy today</p>

          <input type="text" name='firstname' placeholder='First Name' 
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900'
            onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <small className='text-red-500'>{formik.errors.firstname}</small>

          <input type="text" name='lastname' placeholder='Last Name' 
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900'
            onChange={formik.handleChange}/>
          <small className='text-red-500'>{formik.errors.lastname}</small>

          <input type="date" name='dob' placeholder='Date of Birth' 
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900'
            onChange={formik.handleChange}/>
          <small className='text-red-500'>{formik.errors.dob}</small>

          <input type="email" name='email' placeholder='Email'
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900'
            onChange={formik.handleChange}/>
          <small className='text-red-500'>{formik.errors.email}</small>

          <input type="text" name='phonenumber' placeholder='Phone Number' 
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900'
            onChange={formik.handleChange}/>
          <small className='text-red-500'>{formik.errors.phonenumber}</small>

          <input type="password" name='password' placeholder='Password' 
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900'
            onChange={formik.handleChange}/>
          <small className='text-red-500'>{formik.errors.password}</small>


          <label className="text-sm text-blue-900 font-medium">Enter Referral Code</label>
          <input type="text" placeholder='Enter referral code' name='invitercode' 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
            onChange={formik.handleChange} />

          <button type='submit' 
            className='w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-blue-800 transition'>
            Sign Up
          </button>

        
          <p className="text-center text-sm text-gray-600 mt-4">
            Already signed up?{' '}
            <Link href="/student_login" className="text-blue-900 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      
      {msg && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-100 text-blue-900 px-6 py-2 rounded-md shadow">
          {msg}
        </div>
      )}
    </div>
    </>
  )
}

export default Page
