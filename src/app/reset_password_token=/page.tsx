'use client'
import React, { useState } from 'react'

const Page = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [passwordone, setpasswordone] = useState('')
    const [msg, setmsg] = useState('')

    const handleSubmit=async()=>{
        const obj={
            email,passwordone
        }
 if(!email){
setmsg('This field is required')
 }
 else if(!password){
    setmsg('This field is required')
     }
     else if(!passwordone){
        setmsg('This field is required')
         }
    else if(password.length<5){
    setmsg('The character length must be more than 4')
    }
    else if(passwordone.length<5){
        setmsg('The character length must be more than 4')
        }
        else if(password!==passwordone){
            setmsg('Please enter the same password')
            }
    else{
        const response = await fetch(
            "http://localhost/nextjsbackendproject/resetpassword.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(obj),
            }
          );
          const data = await response.json();
          console.log(data);
          
    }
    }
  return (
    <>
    <h1>Reset Your Password</h1>
    <input type="text" onChange={(e)=>setemail(e.target.value)} placeholder='Enter Email'/>
    <input type="text" onChange={(e)=>setpassword(e.target.value)} placeholder='Enter New Password '/>
    <input type="text" onChange={(e)=>setpasswordone(e.target.value)} placeholder='Confirm New Password '/>
    <button onClick={handleSubmit}>Reset Password</button>
    <p>{msg}</p>
    </>
  )
}

export default Page