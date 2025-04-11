'use client'
import { useFormik } from 'formik'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

interface formik{
firstname:string,
lastname:string,
email:string,
dob:string,
password:string,
phonenumber:string,
refcode:string|number,
onboarding:boolean,
}

const Page = () => {
  // const [msg, setmsg] = useState('')
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
              
          },
          onSubmit:async(values)=>{
              
            const value={...values,invitercode};
            // console.log(value);
            
              
          try{
              const response=await fetch('http://localhost/nextjsbackendproject/signup.php',{
                  method:'POST',
                  headers:{
                "Content-Type":"application/json"
                  },
                  body:JSON.stringify(value)
                }) 
                const data=await response.json()
                // console.log(data);
                
               if(data.status==true){
      setmsg("Your account has been created successfully and your referral code has been sent to your inbox or spam folder. you'll be redirected shortly")
      setTimeout(() => {
      
          route.push('/student_login')
      }, 6000);  
  
  } 
  else{
    setmsg('Email exists already')
    setTimeout(() => {
      setmsg('')
    }, 3000);
      // alert('Email exists')
  }
               }
                    
                 
           
          catch(err){
              console.log('Error submitting form',err);
              
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
   <div>
        <form action="" onSubmit={formik.handleSubmit}>
            <input type="text" name='firstname' placeholder='First Name' className='text-red-200 border border-amber-200' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <small className='text-red-400'>{formik.errors.firstname}</small>
            <input type="text" name='lastname' placeholder='Last Name' className='text-red-200 border border-amber-200' onChange={formik.handleChange}/>
            <small className='text-red-400'>{formik.errors.lastname}</small>
            <input type="date" name='dob' placeholder='Date of Birth' className='text-red-200 border border-amber-200' onChange={formik.handleChange}/>
            <small className='text-red-400'>{formik.errors.dob}</small>
            <input type="email"  name='email' placeholder='Email' onChange={formik.handleChange} className='text-red-200 border border-amber-200'/>
            <small className='text-red-400'>{formik.errors.email}</small>
            <input type="text"name='phonenumber' placeholder='Phone Number' className='border border-amber-500' onChange={formik.handleChange} />
            <small className='text-red-400'>{formik.errors.phonenumber}</small>
            <input type="password" name='password' placeholder='Password' className='text-red-200 border border-amber-200' onChange={formik.handleChange}/>
            <small className='text-red-400'>{formik.errors.password}</small>
            <label htmlFor="">Enter Referral Code</label>
            <input type="text" placeholder='Enter referral code' name='invitercode' defaultValue={invitercode} onChange={formik.handleChange} />

            <button type='submit' className='border border-amber-950'>Sign up</button>
        </form>
        <div>{msg}</div>
    </div>
    </>
  )
}

export default Page