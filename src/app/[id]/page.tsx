'use client'

import Navbar from '@/components/Navbar'
// import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Course {
  course_code: string
  course_description: string
  course_title: string
  course_price: number
  level: string
  Language: string
  accesstype: string
  instructor_id: number
  firstname: string
  facebook: string
  qualification: string
  linkedln: string
  course_id: number
  course_video: string
  course_imagecover: string
  admin_verification: number | string
  category: string
}

interface Currentstudent {
  lastname: string
  onboarding: number
  referralcode: string
  student_id: number
  invitercode: string
}

const Page = () => {
  const [currentstudent, setcurrentstudent] = useState<Currentstudent>({
    lastname: '',
    onboarding: 0,
    referralcode: '',
    student_id: 0,
    invitercode: ''
  })
  const route = useRouter()
  const param = useParams()
  const { id } = param
  const [allcourses, setallcourses] = useState<Course[]>([])
  const [singlecourse, setsinglecourse] = useState<Course>()
  const [invitercode, setinvitercode] = useState('')
  const [carts, setcarts] = useState<number>(0)
  const [msg, setmsg] = useState('')

  useEffect(() => {
    const getcourses = async () => {
      const response = await fetch("http://localhost/nextjsbackendproject/displaycourses.php", {
        method: 'GET'
      })
      const data = await response.json()
      setallcourses(data.allcourses)
      console.log(data)
    }
    getcourses()
  }, [])

  useEffect(() => {
    console.log(id)
    console.log(allcourses)
    const course = allcourses.find((course) => String(course.course_id) === id)
    console.log(course)

    if (course) {
      setsinglecourse(course)
      console.log(course)
    }
    else {
      console.log('undefind ooo')
      setInterval(() => {
        // route.push('/')
      }, 5000);
    }
  }, [allcourses, id])

  useEffect(() => {
    console.log(singlecourse)
    const currentstudent = localStorage.getItem('currentstudent')
    localStorage.setItem('viewedcourse', JSON.stringify(singlecourse))
    if (currentstudent) {
      const std = JSON.parse(currentstudent)
      setcurrentstudent(std)
    }
  }, [singlecourse])

  useEffect(() => {
    const code = localStorage.getItem('invitercode')
    if (code) {
      const inv = JSON.parse(code)
      setinvitercode(inv)
    }
  }, [currentstudent])

  const addCart = async () => {
    try {
      if (currentstudent.student_id !== 0) {
        console.log(currentstudent)
        console.log(singlecourse?.instructor_id)
        const payload = {
          studentid: currentstudent?.student_id,
          invitercode: invitercode
        }
        console.log(payload.invitercode)

        const pay = { ...singlecourse, ...payload }
        console.log(pay)

        if (pay.studentid !== 0 && pay.course_id !== 0) {
          const response = await fetch("http://localhost/nextjsbackendproject/order.php", {
            method: 'POST',
            body: JSON.stringify(pay)
          })
          const data = await response.json()
          if (data.status === 200) {
            setmsg(data.msg)
          } else if (data.status === 201) {
            setmsg(data.msg)
          } else if (data.status === 203) {
            setmsg(data.msg)
          } else if (data.status === 501) {
            setmsg(data.msg)
          }
          setTimeout(() => {
            setmsg('')
          }, 3000)
        }
        else {
          console.log('undefined')
        }
      }
      else {
        route.push('/student_login')
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(currentstudent.student_id)
    try {
      if (currentstudent.student_id) {
        const getcart = async () => {
          const response = await fetch('http://localhost/nextjsbackendproject/cart.php', {
            method: 'POST',
            body: JSON.stringify({ studentid: currentstudent?.student_id })
          })
          const data = await response.json()
          console.log(data)
          if (data.status) {
            setcarts(data.carts.length)
          }
        }
        getcart()
      }
    }
    catch (error) {
      console.log(error)
    }
  }, [currentstudent])

  useEffect(() => {
    console.log(carts)
  }, [carts])

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-white text-white">
        <div className="container mx-auto px-4 py-6">
        
          <div className="flex justify-end mb-4">
            <Link href="/cart" className="bg-white text-[#0A1F44] font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100">
              Check Cart ({carts})
            </Link>
          </div>

        
          <div className="grid md:grid-cols-2 gap-8 items-start">
          
            <div>
              <h1 className="text-3xl font-bold mb-3">{singlecourse?.course_title}</h1>
              <p className="text-lg mb-2">Created by: <span className="font-semibold">{singlecourse?.firstname}</span></p>
              <p className="mb-2">Qualification: {singlecourse?.qualification}</p>
              <p className="mb-2">Facebook: <a href={singlecourse?.facebook} className="underline hover:text-blue-400">{singlecourse?.facebook}</a></p>
              <p className="mb-2">LinkedIn: <a href={singlecourse?.linkedln} className="underline hover:text-blue-400">{singlecourse?.linkedln}</a></p>
              <p className="mb-4">Language: {singlecourse?.Language}</p>

              <div className="bg-white text-[#0A1F44] rounded-lg shadow-md p-4 mb-4">
                <h2 className="font-semibold text-lg mb-2">This course includes:</h2>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>High-quality video lectures</li>
                  <li>Downloadable resources</li>
                  <li>Access on mobile and desktop</li>
                  <li>Certificate of completion</li>
                  <li>Lifetime access</li>
                </ul>
              </div>

              <button
                onClick={addCart}
                className="mt-4 w-full  text-white md:w-auto bg-blue-950 text-[#0A1F44] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Add to cart
              </button>
            </div>

            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {singlecourse?.course_imagecover && (
  <Image
    width={400}
    height={400}
    src={`http://localhost/nextjsbackendproject/images/${singlecourse.course_imagecover}`}
              unoptimized
  
    alt="Course Cover"
    className="w-full h-64 object-cover rounded-lg"
  />
)}

              <div className="p-4 text-[#0A1F44]">
                <h3 className="text-xl font-bold mb-2">Course Preview</h3>
                <video controls className="w-full rounded-lg" loop>
                  <source src={singlecourse?.course_video} type="video/mp4"  />
                </video>
              </div>
            </div>
          </div>

          
          {msg && (
            <p className="mx-auto mt-6 w-fit px-4 py-2 text-center text-green-700 bg-green-100 border border-green-300 rounded-lg font-medium shadow">
              {msg}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default Page
