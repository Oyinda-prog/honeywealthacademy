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
  couponcode:string,
  referenceid:string,
  trackingid:string,
  courseactivation:string
}
const Page = () => {
  const route=useRouter()
  const [msg, setmsg] = useState('')
    const [allcourses, setallcourses] = useState<Course[]>([])
    const [couponcode, setcouponcode] = useState('')
        useEffect(() => {
            const getmsg=async()=>{
                const id=localStorage.getItem('studentid')
                if(id){
                    console.log(id);
                    const response=await fetch("http://localhost/nextjsbackendproject/enrolledcourses.php",{
                      method:'POST',
                    body:JSON.stringify({studentid:id})  
                    })
                    const data=await response.json()
                    console.log(data);
                    if(data.status){
                   setallcourses(data.allcourses)
                    }
                     else{
                      setmsg(data.msg)
                    }  
                }
                else{
                  route.push('/student_login')
                }
                
            
          }
          getmsg()
        },
    
        [])
        const activatecode=async(code:string,trackingid:string,referenceid:string,cartid:number)=>{
          if(couponcode===''){
            setmsg('Enter Coupon Code')
          }
          else if(couponcode!==code){
            setmsg('Wrong Coupon Code Entered')
          }
          else{
            const response=await fetch("http://localhost/nextjsbackendproject/activatecourse.php",{
              method:'POST',
            body:JSON.stringify({trackingid,referenceid,cartid})  
            })
            const data=await response.json()
            if(data.status){
              setmsg(data.msg)
              setTimeout(() => {
                route.push(`enrolled_courses/${referenceid}`)
              }, 4000);
            }
            else{
             setmsg(data.msg)
            }
             console.log(data);
             
            // console.log(code,trackingid,referenceid,couponcode,cartid);
          }
          setTimeout(() => {
            setmsg('')
          }, 4000);

          
        }
        const viewcourse=async(referenceid:string)=>{
        
         route.push(`enrolled_courses/${referenceid}`)
        }
  return (
    <>
    <p>{msg}</p>
          <div className="grid lg:grid-cols-4 p-5 gap-5">
            {allcourses.map((course, index) => (
              <div
                key={index}
                className="flex flex-col p-5 rounded-lg shadow-lg items-center space-y-4"
              >
                {/* <h1 key={index}>{course.admin_verification}</h1> */}
                <Image
                  src={`http://localhost/nextjsbackendproject/images/${course.imagecover}`}
                  unoptimized
                  width={100}
                  height={10}
                  alt="image"
                  className="object-cover w-full h-auto"
                ></Image>
                <p>{course.category}</p>
                <p>{course.level}</p>
                <p>{course.language}</p>
                <p>#{course.price}</p>
                {
                  course.courseactivation!=='1'?(
                 <div>
                  <p>Kindly copy the Coupon Code to activate your course: {course.couponcode} and paste it inside the box below</p>
                  <input type="text"  onChange={(e)=>setcouponcode(e.target.value)} placeholder='Enter coupon code'/>
    <p><button onClick={()=>activatecode(course.couponcode,course.trackingid,course.referenceid,course.cart_id)}>Activate Course</button></p>
                 </div> 
                
                  ):(
                    <p></p>
                  )
                }
    <button onClick={()=>viewcourse(course.referenceid)}>View Course</button>
              </div>
            ))}
          </div>
          <div></div>
          <p>{msg}</p>
    </>
  )
}

export default Page