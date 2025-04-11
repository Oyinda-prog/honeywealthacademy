'use client'
import Image from 'next/image'
import React, { FormEvent, useEffect, useState } from 'react'

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

  const [comment, setcomment] = useState('') 
  const [msg, setmsg] = useState('')
    const checkapproval=async(id:number)=>{
     const response=await fetch("http://localhost/nextjsbackendproject/admincourseverification.php",{
      method:'POST',
      body:JSON.stringify({courseid:id})
     })
     const data=await response.json()
     if(data.status){
      setmsg(data.msg)
      
     }
     else{
      setmsg(data.msg)
     }
     setTimeout(() => {
      setmsg('')
     }, 3000);
     
    }
    const disapproval=async(id:number)=>{
      const response=await fetch("http://localhost/nextjsbackendproject/admincourseverificationfalse.php",{
       method:'POST',
       body:JSON.stringify({courseid:id})
      })
      const data=await response.json()
      console.log(data);
      
      if(data.status){
       setmsg(data.msg)
       
      }
      else{
       setmsg(data.msg)
      }
      setTimeout(() => {
       setmsg('')
      }, 5000);
      
     }

    const [allcourses, setallcourses] = useState<Course[]>([])
    
    useEffect(() => {

    const getallcourses=async()=>{
  try {
    const response=await fetch("http://localhost/nextjsbackendproject/allcourses.php",{
        method:'GET'
      })
      const data=await response.json()
      setallcourses(data.allcourses)
      console.log(data); 
  } 
  catch (error) {
    console.log(error);
    
  }
  
    }
    
     getallcourses() 
    }, [])

    useEffect(() => {
     console.log(allcourses);
     
      
    }, [allcourses])
    
    const handlesubmit=async(instructorid:number,e:FormEvent<HTMLFormElement>)=>{
          const payload={
            comment,instructorid
          }
          e.preventDefault()
          const response=await fetch("http://localhost/nextjsbackendproject/admintestcomment.php",{
            method:'POST',
            body:JSON.stringify(payload)
          })
          const data=await response.json()
          console.log(data);
          if(data.status){
            setmsg(data.msg)
          }
          else{
            setmsg(data.msg)
          }
          
          setTimeout(() => {
            setmsg('')
          }, 3000);
        
        }
    
  return (
    <>

<div>
    <p>{msg}</p>
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
                    <div><button disabled={course.admin_verification==1} onClick={()=>checkapproval(course.course_id)}>{course.admin_verification==1?'Approved':'Check approval'
              }</button></div>
             <div >
              <button  onClick={()=>disapproval(course.course_id)}>{course.admin_verification==0?'Disapproved':'Check Disapproval'}</button>
             </div>
            <div>
              <form action="" method="post" onSubmit={(e)=>handlesubmit(course.instructor_id,e)}>
                <h1>Comment</h1>
                <textarea name="msg" id="" onChange={(e)=>setcomment(e.target.value)}>

                </textarea>
                <div>
                <button >Send Comment</button>
                </div>
                
               </form> 
            </div>
 
            </div>
        
        ))
    }
</div>
    </>
  )
}

export default Page