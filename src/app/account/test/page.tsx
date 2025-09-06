'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
interface courseactivated{
  course_code:string,
  course_title:string,
  couponcode:string,
  trackingid:string,
  referenceid:string,
  firstname:string,
  imagecover:string,
  course_id:number
}

const Page = () => {
  const [coursetest, setcoursetest] = useState<courseactivated[]>([])
const [msg, setmsg] = useState('')
  useEffect(() => {
    try {
      const stdid = localStorage.getItem("studentid");
      if (stdid) {
        const id = JSON.parse(stdid);
        const gettest=async()=>{
          const res=await fetch('http://localhost/nextjsbackendproject/studentalltests.php',{
            method:'POST',
            body:JSON.stringify({studentid:id})
            })
            const data=await res.json()
            console.log(data);
            
            if(!data.status){
              
             setmsg('No record') 
              
            }
            else{
              setcoursetest(data.coursesactivated)
            }

          
            
            
        }
       gettest()
      }

    } 
    catch (error) {
      console.log(error);
      
    } 
   }, [])
  
  return (
    <>
    <div >test page</div>
    <p>{msg}</p>
    {
      coursetest!=undefined?(
        coursetest.map((test,index)=>(
          <div key={index} className='shadow p-5' style={{cursor:'pointer'}}>
     <p>Course code: {test.course_code}</p>
     <p>Course Title: {test.course_title}</p>
     <p>Instructor&apos;s Name: {test.firstname}</p>
     
  
     <Link href={`test/${test.course_id}`}>Start Test Now!</Link>
          </div>
        ))
      ):(
        <p>No courses</p>
      )
      
    }
    </>
  )
}

export default Page