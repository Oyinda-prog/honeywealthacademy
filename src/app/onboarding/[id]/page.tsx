'use client'
import React, { useEffect, useState } from 'react'
const Page = () => {
const [referrals, setreferrals] = useState(0)
  useEffect(() => {
    const allreferral=async()=>{
      const invitercode=JSON.parse(localStorage.getItem('referralcode')!)
      const response=await fetch('http://localhost/nextjsbackendproject/allreferrals.php',{
        method:'post',
        headers:{
    "Content-Type":"application/json"
        },
        body:JSON.stringify({invitercode:invitercode})
      })
      const data=await response.json()
      // console.log(data.allusers);
      if(data.status){
  console.log(data.allusers.length);
    setreferrals(data.allusers.length)
    console.log(referrals);
      }
  else{
    setreferrals(0)
  console.log(data.msg);
  
  }
    }
    allreferral()

  }, [])
  useEffect(() => {
  
    console.log(referrals);
    
  }, [referrals])
  
  
  return (
    <>
    <div>Welcome to your page:{referrals} referral(s)</div>
    </>
  )
}

export default Page