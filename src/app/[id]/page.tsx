'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

interface Course{
  course_code:string,
  course_description:string,
  course_title:string,
  course_price:number,
  level:string,
  Language:string,
  accesstype:string,
  instructor_id:number,
  firstname:string,
  facebook:string,
  qualification:string, 
linkedln:string,
  course_id:number,
  course_video:string,
  course_imagecover:string,
  admin_verification:number|string,
  category:string,
}

interface Currentstudent{
  lastname:string,
onboarding:number,
referralcode:string,
student_id:number,
invitercode:string
}

const Page = () => {
  const [currentstudent, setcurrentstudent] = useState<Currentstudent>({
    lastname:'',
    onboarding:0,
    referralcode:'',
    student_id:0,
    invitercode:''
  })
  const route=useRouter()
  const param=useParams()
  const{id}=param
    const [allcourses, setallcourses] = useState<Course[]>([])
    const [singlecourse, setsinglecourse] = useState<Course>()
    const [invitercode, setinvitercode] = useState('')
    const [carts, setcarts] = useState<number>(0)
    const [msg, setmsg] = useState('')
      useEffect(() => {
        const getcourses=async()=>{
    const response=await fetch("http://localhost/nextjsbackendproject/displaycourses.php",{
      method:'GET'
    })
    const data=await response.json()
    setallcourses(data.allcourses)
    console.log(data);
    
        }
        getcourses()
      }, [])
    
     useEffect(() => {
      console.log(id);
      console.log(allcourses);
     const course= allcourses.find((course)=>String(course.course_code)===id)
     console.log(course);
     
     setsinglecourse(course)
    
     }, [allcourses,id])
    
     
     useEffect(() => {
      console.log(singlecourse);
      const currentstudent=localStorage.getItem('currentstudent')
      localStorage.setItem('viewedcourse',JSON.stringify(singlecourse))
      if(currentstudent){
        const std=JSON.parse(currentstudent)
        setcurrentstudent(std)
      }
      
      //  console.log(course?.course_id,course?.instructor_id);
      
     }, [singlecourse])

     useEffect(() => {
      //  console.log(currentstudent.student_id);
      //  console.log(currentstudent.invitercode);
       const code=localStorage.getItem('invitercode')
       if(code){
        const inv=JSON.parse(code)
        console.log(inv);
        setinvitercode(inv)
       }
       
     }, [currentstudent])
     useEffect(() => {
       console.log(invitercode);
       
     }, [invitercode])
     
     
const addCart=async()=>{
  try {
    console.log(singlecourse);
    
      if(currentstudent.student_id!==0){
       console.log(currentstudent);
       console.log(singlecourse?.instructor_id);
       const payload={
         studentid:currentstudent?.student_id,
         invitercode:invitercode
        //  courseid:singlecourse?.course_id,
        //  instructorid:singlecourse?.instructor_id
        }
        console.log(payload.invitercode);
        
        const pay={...singlecourse,...payload}
       console.log(pay);
       
    if(pay.studentid!==0 && pay.course_id!==0){
      const response=await fetch("http://localhost/nextjsbackendproject/order.php",{
        method:'POST',
        body:JSON.stringify(pay)
      })
      const data=await response.json()
      console.log(data);
      if(data.status==false){
setmsg(data.msg)
      }
      else{
setmsg(data.msg)
      }
      setTimeout(() => {
        setmsg('')
      }, 2000);
    }
    else{
      console.log('undefined');
      
    }
    
      }
      else{
        route.push('/student_login')
        console.log('no student found');
        
      }
  }
   catch (error) {
    console.log(error);
    
  }
  
  
  
}
useEffect(() => {
  console.log(currentstudent.student_id);
  
  try {
    if(currentstudent.student_id){
      const getcart=async()=>{
        const response=await fetch('http://localhost/nextjsbackendproject/cart.php',{
          method:'POST',
          body:JSON.stringify({studentid:currentstudent?.student_id})
        })
        const data=await response.json()
        console.log(data);
        if(data.status){
        setcarts(data.carts.length)
        }
        else{
        
        }
          }
          getcart()
    }
  } 
  catch (error) {
  console.log(error);
    
  }
}, [currentstudent])
useEffect(() => {
  console.log(carts);
  
}, [carts])

  return (
    <>
    <div>
      <Link href='/cart'>Check Cart {carts}</Link>
    <div>
      <h1>{singlecourse?.course_title}</h1>
      <p>Created by: {singlecourse?.firstname}</p>
      <p>Qualification: {singlecourse?.qualification}</p>
      <p>Facebook: {singlecourse?.facebook}</p>
       <p>Linkedin: {singlecourse?.linkedln}</p>
       <p>{singlecourse?.Language}</p>
       <div>This course includes:

       </div>

      <button onClick={addCart}>Add to cart</button>
      </div>
      </div>

      <p>{msg}</p>
    </>
  )
}

export default Page