'use client'

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
    const [date, setdate] = useState('')
    const [topic, settopic] = useState('')
    const [id, setid] = useState('')
    const [duration, setduration] = useState('')
    const [allcourses, setallcourses] = useState<Course[]>([])
    const [coursecode, setcoursecode] = useState('')
    const [msg, setmsg] = useState('')
    useEffect(() => {
      const id=JSON.parse(localStorage.getItem('instructorid')!)
      setid(id) 
      if(id){
        const getcoursecode=async()=>{
      const response=await fetch("http://localhost/nextjsbackendproject/allactivatedcourses.php",{
        method:'POST',
        body:JSON.stringify({id})
      })
      const data=await response.json()
      console.log(data.allcourses);
      
if(data.status===true){
    // console.log(23);
    
    setallcourses(data.allcourses)
}
else if(data.status===false){
  setmsg('You are not eligible to create a zoom meeting ')
}
       }
        getcoursecode()
      } 
    }, [])
    

    const handledate=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const now=new Date(e.target.value)
        const newdate=now.toISOString().replace(/\.\d{3}Z$/,'z')
        setdate(newdate)
    }
    // replace(/[\r\n\t]/g, '').trim()
 const time=['00','01','02','03','04','06','07','08','09',10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]
    const handlesubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
const course = allcourses.find(course => 
  course.course_code.replace(/\s/g, '') === coursecode.replace(/\s/g,'')
);
if(course){
    const formdata={
              topic,duration,date,
              email:'honeywealthacademy1@gmail.com'

          }
          const response=await fetch("http://localhost/nextjsbackendproject/zoom.php",{
            method:'POST',
            body:JSON.stringify(formdata)
          })
          const data=await response.json()
          if(data){
        const newform={
            zoomid:crypto.randomUUID(),coursecode,instructorid:id, courseid:course.course_id,joinurl:data.join_url,duration:data.duration,starturl:data.start_url,passcode:data.password,meetingid:data.id,hostemail:data.host_email,hostid:data.host_id,meetingtopic:topic,starttime:data.start_time
        }
        const responses=await fetch("http://localhost/nextjsbackendproject/createzoom.php",{
            method:'POST',
            body:JSON.stringify(newform)
          })
          const datas=await responses.json()
        console.log(datas);
        
          }
          else{
            setmsg('Error processing Request, try again!')
          }
         
        //   console.log(formdata);      
}
else{
    setmsg('Incorrect Course Code Entered')
}
    }
  return (
    <>
    <div>
        
        {
            Array.isArray(allcourses) && 
            <form onSubmit={(e)=>handlesubmit(e)}>
            <label htmlFor="coursecode">Course Code</label>
            <input type="text" id='coursecode' placeholder='coursecode' onChange={(e)=>setcoursecode(e.target.value)} required/>
            <label htmlFor="time">Start Time</label>
        <input type="datetime-local"  id='time' name='time' onChange={handledate} required/>
        <input type="topic" name='topic' onChange={(e)=>settopic(e.target.value)} required/>
       
         <label htmlFor="duration">Select Duration(in minutes)</label>

        <div>
        <select name="duration" id="duration" size={7} className='w-[10%]' onChange={(e)=>setduration(e.target.value)} required>
            {
             time.map((t,index)=>(
                <option value={t}  key={index}>{t}</option>
             ))
            }
            
        </select>
        </div>
        <button type='submit'>Submit</button>
        </form>
        }
        

    </div>
    <p>{msg}</p>
    </>
  )
}

export default Page