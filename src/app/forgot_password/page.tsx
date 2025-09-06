'use client'

import React, { useState } from 'react'
const Page = () => {
    const [email, setemail] = useState('')
    const [check, setcheck] = useState(false)
    const [error, seterror] = useState(false)
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        const response=await fetch("http://localhost/nextjsbackendproject/forgotpassword.php",{
            method:'POST',
            body:JSON.stringify({email})
          })
          const data=await response.json()
          if(data.status===200){
            setcheck(true)
          }

        else if(data.status===401){
             seterror(true)
        }
        setTimeout(() => {
            setcheck(false)
          }, 3000);
          setTimeout(() => {
            seterror(false)
          }, 3000);

        }

  return (
    <>
    <div>Forgot Password</div>
    <form  onSubmit={(e)=>handleSubmit(e)}>
          <input
            type="text"
            name="email"
            className="border border-amber-500"
            onChange={(e)=>setemail(e.target.value)}
            placeholder=" Enter Email"
          />
          <button type='submit'>Verify Email</button>
       </form>
       <div>
        {
            check&&
            <p className="text-green-600">
  A password reset link has been sent to your email. Please check your inbox.
</p>
        }
        {
            error &&
            <p className="text-danger-600">
    Email does not exist
</p>
        }
       </div>
    </>
  )
}

export default Page