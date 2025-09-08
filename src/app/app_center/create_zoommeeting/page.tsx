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
                if(data.status===true){ setallcourses(data.allcourses) }
                else if(data.status===false){ setmsg('You are not eligible to create a zoom meeting ') }
            }
            getcoursecode()
        } 
    }, [])

    const handledate=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const now=new Date(e.target.value)
        const newdate=now.toISOString().replace(/\.\d{3}Z$/,'z')
        setdate(newdate)
    }

    const time=['00','01','02','03','04','06','07','08','09',10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]

    const handlesubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const course = allcourses.find(course => 
            course.course_code.replace(/\s/g, '') === coursecode.replace(/\s/g,'')
        );
        if(course){
            const formdata={ topic,duration,date,email:'honeywealthacademy1@gmail.com' }
            const response=await fetch("http://localhost/nextjsbackendproject/zoom.php",{ method:'POST', body:JSON.stringify(formdata) })
            const data=await response.json()
            if(data){
                const newform={
                    zoomid:crypto.randomUUID(),
                    coursecode,
                    instructorid:id, 
                    courseid:course.course_id,
                    joinurl:data.join_url,
                    duration:data.duration,
                    starturl:data.start_url,
                    passcode:data.password,
                    meetingid:data.id,
                    hostemail:data.host_email,
                    hostid:data.host_id,
                    meetingtopic:topic,
                    starttime:data.start_time
                }
                const responses=await fetch("http://localhost/nextjsbackendproject/createzoom.php",{ method:'POST', body:JSON.stringify(newform) })
                const datas=await responses.json()
                console.log(datas)
            } else { setmsg('Error processing Request, try again!') }
        } else { setmsg('Incorrect Course Code Entered') }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
                {Array.isArray(allcourses) && (
                    <form onSubmit={(e)=>handlesubmit(e)} className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-700">Create Zoom Meeting</h2>

                        <div className="flex flex-col">
                            <label htmlFor="coursecode" className="font-medium">Course Code</label>
                            <input type="text" id='coursecode' placeholder='Enter course code'
                                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                onChange={(e)=>setcoursecode(e.target.value)} required/>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="time" className="font-medium">Start Time</label>
                            <input type="datetime-local" id='time' name='time'
                                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                onChange={handledate} required/>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="topic" className="font-medium">Topic</label>
                            <input type="text" name='topic'
                                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                onChange={(e)=>settopic(e.target.value)} required/>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="duration" className="font-medium">Select Duration (in minutes)</label>
                            <select name="duration" id="duration" size={7} className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                                onChange={(e)=>setduration(e.target.value)} required>
                                {time.map((t,index)=>(<option value={t} key={index}>{t}</option>))}
                            </select>
                        </div>

                        <button type='submit' className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition">Submit</button>
                    </form>
                )}

                {msg && <p className="text-red-500 font-medium">{msg}</p>}
            </div>
        </div>
    )
}

export default Page
