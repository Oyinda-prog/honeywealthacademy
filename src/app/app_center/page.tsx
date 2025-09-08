'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect,useState } from 'react'

const Page = () => {
    const route = useRouter()
    const [commentlength, setcommentlength] = useState(0)
    const [courselength, setcourselength] = useState(0)
    const [zoommeetinglength, setzoommeetinglength] = useState(0)
    const id = localStorage.getItem('instructorid')
    useEffect(() => {
      const id = localStorage.getItem("instructorid");
      if (!id) {
        route.push('/')
      }
    }, []);
    useEffect(() => {
      try {
        if (id !== '0') {
          const getallcourses = async () => {
            const response = await fetch("http://localhost/nextjsbackendproject/getsinglecourse.php", {
              method: 'POST',
              body: JSON.stringify({ instructorid:id })
            })
            const data = await response.json()
            console.log(data);
            console.log(id);
            
            
            setcourselength(data.allcourses.length)
          }
          getallcourses()
        }
      } catch (error) {
        console.log(error)
      }
    }, [id])
    useEffect(() => {
      try {
        if (id !== '0') {
          const getallzoommeeting = async () => {
            const response = await fetch("http://localhost/nextjsbackendproject/allzoommeeting.php", {
              method: 'POST',
              body: JSON.stringify({ instructorid:id })
            })
            const data = await response.json()
            console.log(data);
            console.log(id);
            
            
            setzoommeetinglength(data.allzoom.length)
          }
          getallzoommeeting()
        }
      } catch (error) {
        console.log(error)
      }
    }, [id])
    useEffect(() => {
        const getmsg = async () => {
            const id = localStorage.getItem('instructorid')
            if(id){ console.log(id); }

            const response = await fetch("http://localhost/nextjsbackendproject/getadmintestcomment.php",{
                method:'POST',
                body:JSON.stringify({instructorid:id})  
            })
            const data = await response.json()
            console.log(data)
            if(data.status){
               
                setcommentlength(data.allcomments.length)
            }
        }
        getmsg()
    }, [])

    useEffect(() => {
        const id = localStorage.getItem('instructorid')
        try {
            if (id) {
                const getAllInstructors = async () => {
                    const response = await fetch("http://localhost/nextjsbackendproject/getsingleinstructor.php", {
                        method: 'POST',
                        body: JSON.stringify({ instructorid: id })
                    })
                    const data = await response.json()
                    if (data.instructor.adminteststatus !== 1 && data.instructor.course_status==0) {
                        route.push('/instructor_login')
                    }
                    else if(data.instructor.adminteststatus !== 1 && data.instructor.course_status==1){
                      route.push('/instructor_login')
                    }
                }
                getAllInstructors()
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-white p-6">
            <div className="max-w-6xl mx-auto">
                
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Instructor Dashboard</h1>
                    <p className="text-gray-200">Manage your courses, sessions, and notifications from here.</p>
                </header>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
                        <span className="text-3xl mb-2">📤</span>
                        <h2 className="font-semibold mb-1">Upload Course</h2>
                        <Link href='app_center/upload_courses' className="text-blue-600 hover:underline">Go</Link>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
                        <span className="text-3xl mb-2">📚</span>
                        <h2 className="font-semibold mb-1">View Courses</h2>
                        <Link href='app_center/view_allcourses' className="text-green-600 hover:underline">Go</Link>
                    </div>

                    {/* <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
                        <span className="text-3xl mb-2">📝</span>
                        <h2 className="font-semibold mb-1">CreateTests</h2>
                        <Link href='app_center/test' className="text-yellow-600 hover:underline">Go</Link>
                    </div> */}

                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
                        <span className="text-3xl mb-2">✍️</span>
                        <h2 className="font-semibold mb-1">Create Signature</h2>
                        <Link href='app_center/upload_signature' className="text-pink-600 hover:underline">Go</Link>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
                        <span className="text-3xl mb-2"></span>
                        <h2 className="font-semibold mb-1">Schedule Live Session</h2>
                        <Link href='app_center/live_session' className="text-red-600 hover:underline">Go</Link>
                    </div>
                    {/* <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
                        <span className="text-3xl mb-2">🎥</span>
                        <h2 className="font-semibold mb-1">Create Zoom Meeting</h2>
                        <Link href='app_center/create_zoommeeting' className="text-purple-600 hover:underline">Go</Link>
                    </div> */}

                    {/* <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
                        <span className="text-3xl mb-2">🔔{commentlength}</span>
                        <h2 className="font-semibold mb-1">Notifications</h2>
                        <Link href='app_center/notification' className="text-red-600 hover:underline">Go</Link>
                    </div> */}
                    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
  <span className="text-4xl mb-3 animate-bounce">🔔</span>
  <span className="absolute top-2 right-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
    {commentlength}
  </span>
  <h2 className="font-semibold text-lg mb-2 text-gray-800">Notifications</h2>
  <Link href="app_center/notification" className="text-red-600 hover:underline font-medium">
    Go
  </Link>
</div>

                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h3 className="font-bold text-gray-800">Total Courses</h3>
                        <p className="text-2xl mt-2 text-blue-600">{courselength}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h3 className="font-bold text-gray-800">Scheduled Sessions</h3>
                        <p className="text-2xl mt-2 text-green-600">{zoommeetinglength}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h3 className="font-bold text-gray-800">Earnings</h3>
                        <p className="text-2xl mt-2 text-yellow-600">₦0</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                </div>
            </div>
        </div>
        </>
    )
}

export default Page
