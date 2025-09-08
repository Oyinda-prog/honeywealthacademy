'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Course {
  course_code: string,
  course_description: string,
  course_title: string,
  course_price: number,
  level: string,
  Language: string,
  accesstype: string,
  instructor_id: number,
  course_id: number,
  course_video: string,
  course_imagecover: string,
  admin_verification: number | string,
  category: string
}

const Page = () => {
  const [allcourses, setallcourses] = useState<Course[]>([])
  const [instructorid, setinstructorid] = useState(0)
  const route=useRouter()
  useEffect(() => {
    const id = localStorage.getItem("instructorid");
    if (!id) {
      route.push('/')
    }
  }, []);
  useEffect(() => {
    const id = localStorage.getItem('instructorid')
    if (id) {
      const instructorid = JSON.parse(id)
      setinstructorid(instructorid)
    }
  }, [])

  useEffect(() => {
    // const id = localStorage.getItem('instructorid')
    try {
      if (instructorid !== 0) {
        const getallcourses = async () => {
          const response = await fetch("http://localhost/nextjsbackendproject/getsinglecourse.php", {
            method: 'POST',
            body: JSON.stringify({ instructorid })
          })
          const data = await response.json()
          setallcourses(data.allcourses)
        }
        getallcourses()
      }
    } catch (error) {
      console.log(error)
    }
  }, [instructorid])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     
      <div className="flex justify-end mb-6">
        <Link
          href="/app_center"
          className="px-5 py-2 bg-[#0A1F44] text-white font-semibold rounded-lg shadow hover:bg-blue-850 transition duration-300"
        >
          Go to Dashboard
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-[#0A1F44] mb-6">📚 My Uploaded Courses</h1>

      {allcourses.length === 0 ? (
        <p className="text-center text-gray-500">No courses found yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allcourses.map((course, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl border border-amber-200 p-4 flex flex-col hover:shadow-lg transition duration-300"
            >
              <h2 className="text-lg font-bold text-[#0A1F44] mb-2">
                {course.course_title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{course.course_description}</p>

              <Image
                src={`http://localhost/nextjsbackendproject/images/${course.course_imagecover}`}
                unoptimized
                alt="Course Cover"
                width={400}
                height={200}
                className="rounded-lg mb-3 object-cover w-full h-40"
              />

              <video
                src={`http://localhost/nextjsbackendproject/videos/${course.course_video}`}
                controls
                loop
                className="rounded-lg w-full mb-3"
              ></video>

              <div className="space-y-1 text-sm text-gray-700">
                <p><span className="font-semibold">Code:</span> {course.course_code}</p>
                <p><span className="font-semibold">Instructor:</span> {course.instructor_id}</p>
                <p><span className="font-semibold">Category:</span> {course.category}</p>
                <p><span className="font-semibold">Language:</span> {course.Language}</p>
                <p><span className="font-semibold">Level:</span> {course.level}</p>
                <p><span className="font-semibold">Access Type:</span> {course.accesstype}</p>
                <p><span className="font-semibold">Price:</span> ₦{course.course_price}</p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {course.admin_verification == 1 ? (
                    <span className="text-green-600 font-bold">Verified</span>
                  ) : (
                    <span className="text-red-600 font-bold">Not Verified</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
