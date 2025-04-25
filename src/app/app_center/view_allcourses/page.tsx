'use client'
import Image from 'next/image'
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
    course_id:number,
    course_video:string,
    course_imagecover:string,
    admin_verification:number|string,
    category:string

  }

const Page = () => {
    const [allcourses, setallcourses] = useState<Course[]>([])
    const [instructorid, setinstructorid] = useState(0)
    useEffect(() => {
     const id=localStorage.getItem('instructorid')
     if(id){
        const instructorid=JSON.parse(id)
        setinstructorid(instructorid)
        // console.log(instructorid);
        
     }

    }, [])
    useEffect(() => {
     try {
       if(instructorid!==0){
        console.log(instructorid);
        const getallcourses=async()=>{
        const response=await fetch("http://localhost/nextjsbackendproject/getsinglecourse.php",{
          method:'POST',
          body:JSON.stringify({instructorid})
        })
        const data=await response.json()
        console.log(data.allcourses);
        setallcourses(data.allcourses)
        }
        getallcourses()
       } 
     } 
     catch (error) {
       console.log(error);
        
     }
      
    }, [instructorid])
    
    
  return (
    <>
<div>
    {
        allcourses.map((course,index)=>(
            <div key={index}>
 <h1>{index+1}</h1>
 <p>Course Code:{course.course_code}</p>
                     <p>Course Instructor: {course.instructor_id}</p>
                     <p>Course Title: {course.course_title}</p>
                     <p>Course Descritpion: {course.course_description}</p>
                     <p>Price: #{course.course_price}</p>
                     <p>Language: {course.Language}</p>
                     <p>Admin Verification: {course.admin_verification ?? "N/A"}</p>
                     <p>Access Type: {course.accesstype}</p>
                     <p>Level: {course.level}</p>
                     <Image src={`http://localhost/nextjsbackendproject/images/${course.course_imagecover}`} unoptimized alt='' width={50} height={50}></Image>
                     <video src={`http://localhost/nextjsbackendproject/videos/${course.course_video}`} controls loop></video>
                     <p>Status: {course.admin_verification==1?'Verified':'Not Verified'} </p>

            </div>
        ))
    }
</div>

    </>
  )
}

export default Page