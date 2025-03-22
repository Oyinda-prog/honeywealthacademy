
'use client'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

interface Instructor{
    firstname:string,
    lastname:string,
    email:string,
    dob:string,
    password:string,
    phonenumber:string,
    bio:string,
    gender:string,
    qualification:string,
    refcode:string|number,
    facebook:string,
    linkedln:string

}

const Page = () => {
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

    const formik=useFormik<Instructor>({
        initialValues:{
            firstname:'',
            lastname:'',
            dob:'',
            email:'',
            gender:'',
            phonenumber:'',
            linkedln:'',
            facebook:'',
            password:'',
            qualification:'',
            bio:'',
            refcode:totalref
            
        },
        onSubmit:async(values)=>{
            // console.log(values);
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
            setmsg('Your account has been created successfully and your referral code has been sent to your inbox or spam folder')
        } 
        setTimeout(() => {
            setmsg('')
        }, 4000);   
        console.log(data);
        
            }
            catch(err){
              console.log(err);
              
            }
        },
        validationSchema:Yup.object({
            firstname:Yup.string().required(),
            lastname:Yup.string().required(),
            dob:Yup.string().required(),
            email:Yup.string().required().email('A valid email address is required'),
            gender:Yup.string().required(),
            phonenumber:Yup.string().required(),
            linkedln:Yup.string().required(),
            facebook:Yup.string().required(),
            password:Yup.string().required(),
            bio:Yup.string().required()
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
            <input type="text"  name='linkedln' placeholder='Linkedln profile link' onChange={formik.handleChange} className='text-red-200 border border-amber-200'/>
            <small className='text-red-400'>{formik.errors.linkedln}</small>
            <input type="text"name='facebook' placeholder='Facebook Profile Link' className='border border-amber-500' onChange={formik.handleChange} />
            <small className='text-red-400'>{formik.errors.facebook}</small>
           <textarea name="bio" className='border border-amber-500' id="" placeholder='A short bio about you ....'  onChange={formik.handleChange}></textarea>
            <small className='text-red-400'>{formik.errors.bio}</small>
            <label htmlFor="">Gender</label>
            <select name="gender" id="" className='border border-amber-500'  onChange={formik.handleChange}>
                <option value=""></option>
                <option value="Female">Female</option>
                <option value="Male">Male</option> 
            </select>
            <small className='text-red-400'>{formik.errors.gender}</small>

            <label htmlFor="">Qualification</label>
            <select name="qualification" id="" className='border border-amber-500'  onChange={formik.handleChange}>
                <option value=""></option>
                <option value="Bachelor&apos;s Degree">Bachelor&apos;s Degree</option>
                <option value="Male">High School</option> 
                <option value="Others">Others</option>
            </select>
            <small className='text-red-400'>{formik.errors.qualification}</small>
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