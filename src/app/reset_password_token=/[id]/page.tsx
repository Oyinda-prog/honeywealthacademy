'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const route=useRouter()
  const [token, settoken] = useState('')
  const [msg, setmsg] = useState('')
    const param=useParams()
    const {id}=param


    useEffect(() => {
      const tokenconfirm=async()=>{
        const res= await fetch('http://localhost/nextjsbackendproject/resetpasswordtoken.php',{
          method:'POST',
          body:JSON.stringify({token:id})
        })
        const data=await res.json()
        if(data.status===200){
        settoken(data.token)
          // console.log(data);
        }
        else if(data.status===201){
          setmsg(data.msg)
          setInterval(() => {
            route.push('/forgot_password')
          }, 4000);
          console.log('not found');
          
        }
      }
      tokenconfirm()
      
      
    }, [])
    
    
        const [password, setpassword] = useState('')
        const [passwordone, setpasswordone] = useState('')
        
    
        const handleSubmit=async()=>{
            const obj={
                passwordone,
                token
            }
     
     if(!password){
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
              if(data.status===200){
               setmsg(data.msg)
               setInterval(() => {
                route.push('/student_login')
               }, 4000);
              }
              else if(data.status===201){
              setmsg(data.msg)
              }

              console.log(data);
              
        }
        setTimeout(() => {
          setmsg('')
        }, 3000);
      }
  return (
    <>
    <h1>Reset Your Password</h1>
    
    <input type="text" onChange={(e)=>setpassword(e.target.value)} placeholder='Enter New Password '/>
    <input type="text" onChange={(e)=>setpasswordone(e.target.value)} placeholder='Confirm New Password '/>
    <button onClick={handleSubmit}>Reset Password</button>
    <p>{msg}</p>
    </>
  )
}

export default Page