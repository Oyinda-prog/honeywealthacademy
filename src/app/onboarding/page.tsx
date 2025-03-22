'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'

interface formik{
    firstname:string,
    lastname:string,
    email:string,
    dob:string,
    password:string,
    phonenumber:string,
    refcode:string|number,
    onboarding:boolean,
    student_id:number
    }

const Page = () => {
    // let studentid=''
    const route=useRouter()
    const [userid, setuserid] = useState('')
    useEffect(() => {
    const settimeout=setTimeout(() => {
        localStorage.removeItem('current_time')
         route.push("/student_login")
        }, 500000);
        return ()=>clearTimeout(settimeout)
      
    },[])
useEffect(() => {
    if(localStorage['studentid']){
    //    const studentid=
        setuserid(JSON.parse(localStorage.getItem('studentid')!))
        // console.log(userid);

    
      }
}, [])


const formik=useFormik({
    initialValues:{
        educationlevel:'',
        gender:'',
        
        
    },
    onSubmit:async(values)=>{
        // alert(12)
        const payload={
            ...values,
            studentid:userid
        }
        console.log(payload);
        
    try {
        const response=await fetch('http://localhost/nextjsbackendproject/studentonboarding.php',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        }
    ) 
       const data=await response.json() 
       console.log(data);
          
    //   if(data){
    //     console.log(data);
        
    //   }
    //   else{
    //     alert('failed')
    //   }
      
      
    } catch (err) {
      console.log(err);
        
    }
    },
    validationSchema:Yup.object({
        educationlevel:Yup.string().required(),
        gender:Yup.string().required()
    })
   })
    
  return (
    <>
<form action="" onSubmit={formik.handleSubmit}>
<label htmlFor="">What is your highest level of education</label>
    <input type="radio" name='educationlevel' value="High School"   onChange={formik.handleChange}/><span>High School</span>
    <input type="radio" name='educationlevel' value="Undergraduate" onChange={formik.handleChange}/> <span>Undergraduate</span>
    <input type="radio" name='educationlevel' value="Post Graduate" onChange={formik.handleChange} /><span>Post Graduate </span>
    <input type="radio" name='educationlevel' value="Other"/> <span>Other</span>

    <label htmlFor="">Gender(Optional)</label>
    <select name="gender" id="" onChange={formik.handleChange}>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
    </select>
    <button type="submit" className='border border-amber-700'>Submit</button>
</form>
    </>
  )
}

export default Page