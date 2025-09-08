'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Course {
  course_code: string;
  course_description: string;
  course_title: string;
  price: number;
  level: string;
  language: string;
  accesstype: string;
  instructor_id: number;
  firstname: string;
  facebook: string;
  qualification: string;
  linkedln: string;
  course_id: number;
  course_video: string;
  imagecover: string;
  category: string;
  cart_id: number;
  couponcode: string,
  referenceid: string,
  trackingid: string,
  courseactivation: string
}

const Page = () => {
  const route = useRouter()
  const [msg, setmsg] = useState('')
  const [allcourses, setallcourses] = useState<Course[]>([])
  const [couponcode, setcouponcode] = useState('')

  useEffect(() => {
    const getmsg = async () => {
      const id = localStorage.getItem('studentid')
      if (id) {
        const response = await fetch("http://localhost/nextjsbackendproject/enrolledcourses.php", {
          method: 'POST',
          body: JSON.stringify({ studentid: id })
        })
        const data = await response.json()
        console.log(data);
        
        if (data.status) {
          setallcourses(data.allcourses)
        }
        else {
          setmsg(data.msg)
        }
      }
      else {
        route.push('/student_login')
      }
    }
    getmsg()
  }, [])

  const activatecode = async (code: string, trackingid: string, referenceid: string, cartid: number) => {
    if (couponcode === '') {
      setmsg('Enter Coupon Code')
    }
    else if (couponcode !== code) {
      setmsg('Wrong Coupon Code Entered')
    }
    else {
      const response = await fetch("http://localhost/nextjsbackendproject/activatecourse.php", {
        method: 'POST',
        body: JSON.stringify({ trackingid, referenceid, cartid })
      })
      const data = await response.json()
      if (data.status) {
        setmsg(data.msg)
        setTimeout(() => {
          route.push(`enrolled_courses/${referenceid}`)
        }, 3000);
      }
      else {
        setmsg(data.msg)
      }
    }
    setTimeout(() => {
      setmsg('')
    }, 4000);
  }

  const viewcourse = async (referenceid: string) => {
    route.push(`enrolled_courses/${referenceid}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-gray-900">
      
      <div className="flex justify-between items-center px-8 py-4 bg-[#0A1F44] shadow-md sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white">🎓 My Courses</h1>
        <button
          onClick={() => route.push('/account')}
          className="bg-white text-[#0A1F44] px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Go to Dashboard
        </button>
      </div>

      
      {msg && (
        <div className="mx-8 mt-6 text-center text-sm font-medium text-white bg-red-500 px-4 py-2 rounded-lg shadow-md">
          {msg}
        </div>
      )}

  
      <div className="p-8 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {allcourses.map((course, index) => (
          <div
            key={index}
            className="flex flex-col rounded-2xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition duration-300"
          >
            <Image
              src={`http://localhost/nextjsbackendproject/images/${course.imagecover}`}
              unoptimized
              width={400}
              height={200}
              alt="course image"
              className="object-cover w-full h-48"
            />

            <div className="p-5 flex flex-col space-y-3 flex-grow">
              <h2 className="text-lg font-semibold text-gray-900">{course.course_title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{course.course_description}</p>

              <div className="text-xs text-gray-500 space-y-1">
                <p>📚 Category: {course.category}</p>
                <p>🎓 Level: {course.level}</p>
                <p>🌍 Language: {course.language}</p>
                <p>👨‍🏫 Instructor: {course.firstname} ({course.qualification})</p>
              </div>

              <p className="text-lg font-bold text-[#0A1F44] mt-2">₦{course.price}</p>

              {course.courseactivation !== '1' ? (
                <div className="space-y-2">
                  <p className="text-sm">
                    Enter code <span className="font-semibold">{course.couponcode}</span> to activate.
                  </p>
                  <input
                    type="text"
                    onChange={(e) => setcouponcode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0A1F44] outline-none"
                  />
                  <button
                    onClick={() => activatecode(course.couponcode, course.trackingid, course.referenceid, course.cart_id)}
                    className="w-full bg-[#0A1F44] text-white px-4 py-2 rounded-lg hover:bg-[#132c65] transition"
                  >
                    Activate Course
                  </button>
                </div>
              ) : (
                <p className="text-sm text-green-600 font-medium">✅ Course Activated</p>
              )}

              {
                course.courseactivation==='1'?(
                  <button
                onClick={() => viewcourse(course.referenceid)}
                className="mt-3 w-full border border-[#0A1F44] text-[#0A1F44] px-4 py-2 rounded-lg hover:bg-[#0A1F44] hover:text-white transition"
              >
                View Course
              </button>
                ):''
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
