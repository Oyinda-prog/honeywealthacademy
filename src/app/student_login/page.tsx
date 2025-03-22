'use client'
import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'


interface User{
    email:string,
    password:string
}
const Page = () => {
    const route=useRouter()
    
   const formik=useFormik<User>({
    initialValues:{
        email:'',
        password:''
    },
    onSubmit:async(values)=>{
    try {
        const response=await fetch('http://localhost/nextjsbackendproject/studentlogin.php',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(values)
        }
    ) 
       const data=await response.json()    
      if(data.status){
        console.log(data.user.student_id);
        
        localStorage.setItem('currenttime',JSON.stringify('true'))
        localStorage.setItem('studentid',JSON.stringify(data.user.student_id))
        // localStorage.setItem('firstletter',JSON.stringify(data.firstletter))
        // localStorage.setItem('firstname',JSON.stringify(data.firstname))
         route.push("/onboarding")
      }
      else{
        alert('failed')
      }
      
      
    } catch (err) {
      console.log(err);
        
    }
    },
    validationSchema:Yup.object({
        email:Yup.string().required(),
        password:Yup.string().required()
    })
   })

  return (
    <>
    <div>
        <form action="" onSubmit={formik.handleSubmit}>
            <input type="text" name='email' className='border border-amber-500' onChange={formik.handleChange} placeholder='Email'/>
            <input type="text"  name='password' className='border border-amber-500' onChange={formik.handleChange} placeholder='password'/>
            <button type='submit' className='border border-amber-500'>Log in</button>
        </form>
    </div>
    </>
  )
}

export default Page