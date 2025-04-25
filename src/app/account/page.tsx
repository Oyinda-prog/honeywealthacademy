'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect,useState } from 'react'


const Page = () => {
  const [balance, setbalance] = useState(0)
  const route=useRouter()
  useEffect(() => {
  
    const id=localStorage.getItem('invitercode')
    if(id){
      const invitercode=JSON.parse(id)
      // console.log(invitercode);
      
      const getall=async()=>{
   const res=await fetch('http://localhost/nextjsbackendproject/account.php',{
method:'POST',
body:JSON.stringify({invitercode})
})
const data=await res.json()
console.log(data);

if(data){
  
  


  const stdid = localStorage.getItem("studentid");
            console.log(stdid);
        
            if (stdid) {
              const id = JSON.parse(stdid);
              console.log(id);
              const res=await fetch('http://localhost/nextjsbackendproject/accountstudent.php',{
                method:'POST',
                body:JSON.stringify({studentid:id})
                })
                const data=await res.json() 
                if(data.status){
setbalance(data.balance)
                  // console.log(data.balance);
                }
                else if(data.balance===null){
setbalance(0)
                }
                
else{
  // setbalance(0)
  route.push('/student_login')
}
                
            }

}
else{
  // setbalance(0)
}
// console.log(data);

     }
      getall();
      
    }
  }, [])
  
  return (
    <>
    <div>
    <Link href='/account/settings/'>Settings</Link>
       <p>Balance: {balance}</p>
       <Link href='/account/withdrawal'>Withdraw</Link>
       <Link href='/account/enrolled_courses'>Enrolled Courses</Link>
       <Link href='/account/test'>Write Test</Link>
    </div>

    <div>
      {/* <p>Withdraw money</p> */}

    </div>
    </>
  )
}

export default Page