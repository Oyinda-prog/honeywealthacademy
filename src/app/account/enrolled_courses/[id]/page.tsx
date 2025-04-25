'use client'
import { useParams } from 'next/navigation'
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
}

const Page = () => {
    const [cart, setcart] = useState<Course>()
    const param=useParams()
    useEffect(() => {
        const {id}=param
        // console.log(id);
        const referenceid=id
        const viewcourse=async()=>{
            const response=await fetch("http://localhost/nextjsbackendproject/viewactivatedcourse.php",{
              method:'POST',
            body:JSON.stringify({referenceid})  
            })
            const data=await response.json()
    
             console.log(data.cart)
             setcart(data.cart)
            
            }
            viewcourse()
    }, [])
    useEffect(() => {
      console.log(cart);
      
    }, [cart])
    
    
  return (
    <>
    <div>
<p>{cart?.course_title}</p>
<p>{cart?.course_description}</p>
<p>{cart?.language}</p>
<p>{cart?.level}</p>
<video src={`http://localhost/nextjsbackendproject/videos/${cart?.course_video}`} controls></video>
    </div>
    <div>
  
    </div>
    </>
  )
}

export default Page