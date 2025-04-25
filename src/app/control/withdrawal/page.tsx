'use client'
import React, { useEffect, useState } from 'react'
interface withdrawalinterface{
  accountnumber:string,
adminverify:number|null,
amount:number|null,
bankname:string,
couponcode:string|null
holdername:string,
paymentmethod:string|null,
paymentstatus:string|null,
reference_id:null|string,
student_id:number,
tracking_id:null | string,
transactiondate:string,
transactionid:string,
withdraw_id:number,
balance:number

}


const Page = () => {
  // const alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  // const number=[1,3,4,5,6,7,8,9,0,2]
    
  //   const first=alphabet[Math.floor(Math.random()*alphabet.length)]
  //   const second=alphabet[Math.floor(Math.random()*alphabet.length)]
  //   const third=alphabet[Math.floor(Math.random()*alphabet.length)]
  //   const fourth=Math.floor(Math.random()*10)
  //   const fifth=alphabet[Math.floor(Math.random()*alphabet.length)]
  //   const a=Math.round(Math.random()*number.length)
  //   const sixth=alphabet[Math.floor(Math.random()*alphabet.length)]
  //   const seventh=alphabet[Math.floor(Math.random()*alphabet.length)]
  // // const couponcode=first+second+third+a+fifth+sixth+fourth+a+seventh
  const [allwithdrawal, setallwithdrawal] = useState<withdrawalinterface[]>([])
  const [msg, setmsg] = useState('')
  const trackingid=crypto.randomUUID()
  // const referenceid=crypto.randomUUID()+a+second+sixth+third

  useEffect(() => {
    
    const getwithdrawal=async()=>{
      const response=await fetch("http://localhost/nextjsbackendproject/adminwithdrawal.php",{
        method:'GET',
       })
       const data=await response.json()
       console.log(data.allwithdrawals);
       if(data.status){
setallwithdrawal(data.allwithdrawals)
       }
       else{
setmsg(data.msg)
       }
       
    }
    getwithdrawal()
  }, [])

  useEffect(() => {
    console.log(allwithdrawal);
    
  }, [allwithdrawal])
  
  const verifypayment=async(withdrawalid:number,studentid:number)=>{
    
    const response=await fetch("http://localhost/nextjsbackendproject/verifywithdrawal.php",{
      method:'POST',
      body:JSON.stringify({studentid,withdrawalid,trackingid})
     })
     const data=await response.json()
     console.log(data);
     
     if(data.status){
      setmsg(data.msg)
     }
     else{
      setmsg(data.msg)
     }
     setTimeout(() => {
      setmsg('')
     }, 4000);
  }
  const declinepayment=async(withdrawalid:number,studentid:number)=>{
    
    const response=await fetch("http://localhost/nextjsbackendproject/declinewithdrawal.php",{
      method:'POST',
      body:JSON.stringify({studentid,withdrawalid})
     })
     const data=await response.json()
     if(data.status){
      setmsg(data.msg)
     }
     else{
      setmsg(data.msg)
     }
     setTimeout(() => {
      setmsg('')
     }, 4000);    
  }

  const processingpayment=async(withdrawalid:number,studentid:number)=>{
    
    const response=await fetch("http://localhost/nextjsbackendproject/processingwithdrawal.php",{
      method:'POST',
      body:JSON.stringify({studentid,withdrawalid})
     })
     const data=await response.json()
     if(data.status){
      setmsg(data.msg)
     }
     else{
      setmsg(data.msg)
     }
     setTimeout(() => {
      setmsg('')
     }, 4000);    
  }
  
  return (
    <>
    <p>The Withdrawals Requests</p>
    <div>
      {
        allwithdrawal.map((withdrawal)=>(
          <div key={withdrawal.withdraw_id}>
<p>Withdrawal Id:{withdrawal.withdraw_id}</p>
<p>Accountnumber: {withdrawal.accountnumber}</p>
<p>Bank Name: {withdrawal.bankname}</p>
<p>Holder Name: {withdrawal.holdername}</p>
<p>Amount Request: {withdrawal.amount}</p>
<p>Available Balance: {withdrawal.balance}</p>
<p>Payment Status: {withdrawal.paymentstatus}</p>
<p>Admin Verify: {withdrawal.adminverify}</p>
<p>Transaction Date: {withdrawal.transactiondate}</p>
<p>Studentid:{withdrawal.student_id}</p>
<button onClick={()=>verifypayment(withdrawal.withdraw_id,withdrawal.student_id)}>Verify Payment</button>
<button onClick={()=>declinepayment(withdrawal.withdraw_id,withdrawal.student_id)}>Decline Payment</button>
<button onClick={()=>processingpayment(withdrawal.withdraw_id,withdrawal.student_id)}>Processing</button>
          </div>
        ))
      }
    </div>
    <p>{msg}</p>
    </>
  )
}

export default Page 