'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface User{
  lastname:string
}

const Page = () => {
   const [currentuser, setcurrentuser] = useState<User|null>(null)
   const [refcode, setrefcode] = useState('')
   useEffect(() => {
    const storeuser=localStorage.getItem('currentinstructor')
    if(storeuser){
     setcurrentuser(JSON.parse(storeuser))
    }
   }, [])
    useEffect(() => {
      const referralcode=localStorage.getItem('referralcode')
       if(referralcode){
       setrefcode(JSON.parse(referralcode))
       }
    }, [])
  return (
    <>
      {
        currentuser?(
          <p>Welcome, {currentuser.lastname}</p>
        ):(
          <p>loading.....</p>
        )
      }
      <p>Here is your referral link: <Link style={{textDecoration:'underline'}} href={`http://localhost:3000/instructor_signup/${refcode}`}>http://localhost:3000/instructor_signup/{refcode}</Link></p>
      <p>Your referral code:{refcode}</p>
    </>
    
  )
  
}

export default Page