'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect} from 'react'


const Page = () => {
    const route= useRouter()
    //  const [adminstatus, setadminstatus] = useState(undefined)
        useEffect(() => {
          const id=localStorage.getItem('instructorid')
         try {
          if(id){
            console.log(id);
            
        
        const getAllInstructors=async()=>{
      const response= await fetch("http://localhost/nextjsbackendproject/getsingleinstructor.php",{
        method:'POST',
        body:JSON.stringify({instructorid:id})
      })
     const data=await response.json()
    console.log(data.instructor.adminteststatus);
    if(data.instructor.adminteststatus!==1){
         route.push('/instructor_login')
              }
    // setadminstatus(data.instructor.adminteststatus)
    
      }
      getAllInstructors()
    
        }
         } 
         catch (error) {
          console.log(error);
          
         }
        
        }, [])
    
    
  return (
    <>
    <div>

   <Link href='app_center/upload_courses'>Upload Course</Link>
   <Link href='app_center/viewcourses'>View Course</Link>
   
   <Link href='app_center/test'>Test</Link>
   {/* <Link href='app_center/viewcourses'>View Course</Link> */}
    </div>
    </>
  )
}

export default Page