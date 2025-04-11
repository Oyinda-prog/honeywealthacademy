'use client'
import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
interface Instructor{
  instructor_id:number,
  onboarding:number,
  course_code:string,
  course_status:number,
  course_title:string,
  course_description:string,
  bio:string,
  facebook:string,
  linkedin:string,
  qualification:string,
  course_video:string,
  adminteststatus:boolean|null|number
}
const Page = () => {
  const [allinstructors, setallinstructors] = useState<Instructor[]>([])
  const [comment, setcomment] = useState('') 
  const [msg, setmsg] = useState('')


  useEffect(() => {
    
    const getAllInstructors=async()=>{
  const response= await fetch("http://localhost/nextjsbackendproject/adminallinstructors.php",{
    method:'GET'
  })
 const data=await response.json()
  
  if(data.status){
    setallinstructors(data.allinstructors) 
  }

  
  else{
setmsg('No instructors yet')
  }
    
  }
  getAllInstructors()
    }, [])
  


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
    const checkapproval=async(id:number)=>{
     const response=await fetch("http://localhost/nextjsbackendproject/getadminteststatus.php",{
      method:'POST',
      body:JSON.stringify({instructorid:id})
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
      const response=await fetch("http://localhost/nextjsbackendproject/getadmintestdis.php",{
       method:'POST',
       body:JSON.stringify({instructorid:id})
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

  return (
    <>
    <div><Link href='/control/courseview'>View Courses</Link></div>
  <div>{msg}</div>
      {
      
        allinstructors.map((instructors, index)=>(
          <div key={index}>
            <p>Instructor ID:{instructors.instructor_id}</p>
            <p>Instructor Onboarding: {instructors.onboarding}</p>
            <p>Course Code: {instructors.course_code}</p>
            <h1><b>Course Status:</b> {instructors.course_status}</h1>
            <p> Course Title: {instructors.course_title}</p>
            <p>Course Description: {instructors.course_description}</p>
            <p>Instructor Bio:{instructors.bio}</p>
            <p>Instructor Facebook:{instructors.facebook}</p>
            <p>Instructor linkedln:{instructors.linkedin}</p>
            <p>Instructor Qualification:{instructors.qualification}</p>
             <div><button disabled={instructors.adminteststatus==1} onClick={()=>checkapproval(instructors.instructor_id)}>{instructors.adminteststatus==1?'Approved':'Approve'
              }</button></div>
             <div >
              <button disabled={instructors.adminteststatus==0} onClick={()=>disapproval(instructors.instructor_id)}>{instructors.adminteststatus==0?'Disapproved':'Disapprove'}</button>
             </div>
              <video src={`http://localhost/nextjsbackendproject/videos/${instructors.course_video}`} controls loop></video>
            <div>
              <form action="" method="post" onSubmit={(e)=>handlesubmit(instructors.instructor_id,e)}>
                <h1>Comment</h1>
                <textarea name="msg" id="" onChange={(e)=>setcomment(e.target.value)}>

                </textarea>
                <div>
                <button >Send Comment</button>
                </div>
                
              </form>
            </div>
            <hr />
          </div>
          
        ))
      }
   
      </>
  )
}

export default Page