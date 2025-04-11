'use client'

import { useParams } from "next/navigation"
import { useEffect} from "react"
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import * as Yup from 'yup'

interface Instructor{
    firstname:string,
    lastname:string,
    email:string,
    refcode:string|number,
    password:string,
    invitercode:string

}

const Page = () => {
  const [invitercode, setinvitercode] = useState<string>('')
const usep=useParams<{id:string}>()

const {id}=usep
useEffect(() => {
 if(id){
  setinvitercode(id)
 }

}, [id])

useEffect(() => {
  console.log(invitercode);
  
}, [invitercode])


   const [msg, setmsg] = useState('')
      const route=useRouter()
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
   
       const formik=useFormik<Instructor>({
           initialValues:{
               firstname:'',
               lastname:'',
               email:'',
               password:'',
               refcode:totalref,
              invitercode:invitercode,
           },
           onSubmit:async(values)=>{
        //  const value={...values};
         console.log(values);
         
          
               try{
           const response=await fetch('http://localhost/nextjsbackendproject/instruct.php',{
                method:"POST",
                headers:{
               "Content-Type":"application/json",
                },
                body:JSON.stringify(values),
                mode:"cors"
           })
           const data=await response.json()
           if(data.status==true){
               setmsg("Your account has been created successfully and your referral code has been sent to your inbox or spam folder. You'll will redirected shortly")
               setTimeout(() => {
       
                   route.push('/instructor_login')
               }, 6000);
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
  <div>
        <h1>Sign Up page</h1>
    <form action="" onSubmit={formik.handleSubmit}>
            <input type="text" name='firstname' placeholder='First Name' className='text-red-200 border border-amber-200' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <small className='text-red-400'>{formik.errors.firstname}</small>
            <input type="text" name='lastname' placeholder='Last Name' className='text-red-200 border border-amber-200' onChange={formik.handleChange}/>
            <small className='text-red-400'>{formik.errors.lastname}</small>
            <input type="email"  name='email' placeholder='Email' onChange={formik.handleChange} className='text-red-200 border border-amber-200'/>
            <small className='text-red-400'>{formik.errors.email}</small>
            <input type="password" name='password' placeholder='Password' className='text-red-200 border border-amber-200' onChange={formik.handleChange}/>
            <small className='text-red-400'>{formik.errors.password}</small>
            <input type="text" name='invitercode' defaultValue={invitercode} placeholder='Enter Referral code' className='text-red-200 border border-amber-200' onChange={formik.handleChange}/>
            <button type='submit' className='border border-amber-950'>Sign up</button>
            </form>
           
    </div>
    <div>
        {msg}
    </div>
    </>
  )
}

export default Page