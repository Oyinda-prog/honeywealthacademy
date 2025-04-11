'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [pinone, setpinone] = useState<number>(0)
    const [pintwo, setpintwo] = useState<number>(0)
    const [studentid, setstudentid] = useState('')
    const [msg, setmsg] = useState('')
const route=useRouter()
 
useEffect(() => {
  
    const stdid = localStorage.getItem("studentid");
    // console.log(stdid);
    if (stdid) {
        const id = JSON.parse(stdid);
    setstudentid(id)
        
    }
    else{
        route.push('/student_login')
    }
},[])


    const handlesubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(String(pinone).length!==4){
 setmsg('enter 4-digits');
 
        }
        else if(String(pintwo).length!==4){
            setmsg('enter 4-digits');

        }
        else if(pinone!==pintwo){
setmsg('Enter the same digits');

        }
        else{
            const res=await fetch('http://localhost/nextjsbackendproject/transactionpin.php',{
                method:'POST',
                body:JSON.stringify({studentid,pinone})
                })
                const data=await res.json() 
                if(data.status){
    setmsg(data.msg)
                } 
                else{
                    setmsg(data.msg)
                }               
                // console.log(data);
                 
        }
//  console.log(pinone,pintwo);

 
    }
  return (
    <>
    <form onSubmit={(e)=>handlesubmit(e)}>
<input type="number" placeholder='Enter 4-digits' onChange={(e)=>setpinone(Number(e.target.value))} style={{border:'2px solid red'}}/>
<input type="number"  placeholder='Confirm pin' onChange={(e)=>setpintwo(Number(e.target.value))}/>
<button type='submit'>Change Pin</button>
    </form>
    <p>{msg}</p>

    <Link href='/account'>Go back to account</Link>
    </>
  )
}

export default Page