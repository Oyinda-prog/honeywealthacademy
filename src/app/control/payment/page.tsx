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
      const alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
      const number=[1,3,4,5,6,7,8,9,0,2]
        
        const first=alphabet[Math.floor(Math.random()*alphabet.length)]
        const second=alphabet[Math.floor(Math.random()*alphabet.length)]
        const third=alphabet[Math.floor(Math.random()*alphabet.length)]
        const fourth=Math.floor(Math.random()*10)
        const fifth=alphabet[Math.floor(Math.random()*alphabet.length)]
        const a=Math.round(Math.random()*number.length)
        const sixth=alphabet[Math.floor(Math.random()*alphabet.length)]
        const seventh=alphabet[Math.floor(Math.random()*alphabet.length)]
      const couponcode=first+second+third+a+fifth+sixth+fourth+a+seventh
      
      const trackingid=crypto.randomUUID()
      const referenceid=crypto.randomUUID()+a+third+sixth+fourth
    

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
            body:JSON.stringify({cartid,paymentid,studentid,couponcode,referenceid,trackingid})
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