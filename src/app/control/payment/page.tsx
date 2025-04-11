'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
 interface payment {
    admin_verify:null,
    cart_id:number,
    course_code:string
    course_title:string
    createdat:string,
    instructor_id:number,
    payment_id:number
    payment_status:null
    price:number,
    receipt:string,
    student_id:number
 }
const Page = () => {
    const [msg, setmsg] = useState('')
    const [allpayments, setallpayments] = useState<payment[]>([])

    try {
        useEffect(() => {
            const getpayment=async()=>{
              const response= await fetch("http://localhost/nextjsbackendproject/adminpaymentverify.php",{
                  method:'GET'
                })
                const data=await response.json()
                if(data.status){
            setallpayments(data.allpayments)
                }
                else{
                  setmsg(data.msg)
                }
                console.log(data);
                
            }
            getpayment()
          }, [])
            
    } 
    catch (error) {
       console.log(error);
        
    }
    useEffect(() => {
      console.log(allpayments);
      
    }, [allpayments])
   

    const checkapprove=async(cartid:number,paymentid:number,studentid:number)=>{
        const res=await fetch('http://localhost/nextjsbackendproject/verifypayment.php',{
            method:'POST',
            body:JSON.stringify({cartid,paymentid,studentid})
        })
           const data=await res.json()
           if(data.status){
            setmsg(data.msg)
           }
           else{
            setmsg(data.msg)
           }
            } 



    const checkdisapprove=async(cartid:number,paymentid:number,studentid:number)=>{
        const res=await fetch('http://localhost/nextjsbackendproject/verifypaymentfalse.php',{
            method:'POST',
            body:JSON.stringify({cartid,paymentid,studentid})
        })
           const data=await res.json()
           if(data.status){
            setmsg(data.msg)
           }
           else{
            setmsg(data.msg)
           }
    }
  return (
    <>
    <p>{msg}</p>
    <div>
        {
            allpayments.map((payments,index)=>(
                <div key={index}>
              <p>{payments.payment_id}</p>
              <p>{payments.instructor_id}</p>
              <p>{payments.cart_id}</p>
              <p>{payments.student_id}</p>
              <p>{payments.course_code}</p>
              <p>{payments.course_title}</p>
              <p>{payments.payment_status}</p>
              <p>{payments.admin_verify}</p>
              <p>{payments.createdat}</p>
              <Image src={`http://localhost/nextjsbackendproject/receipts/${payments.receipt}`} width={100} height={100} alt='' unoptimized></Image>
              <button onClick={()=>checkapprove(payments.cart_id,payments.payment_id,payments.student_id)}>Approve</button>
              <button onClick={()=>checkdisapprove(payments.cart_id,payments.payment_id,payments.student_id)}>Disapprove</button>
                </div>
            ))
        }
    </div>
    </>
  )
}

export default Page