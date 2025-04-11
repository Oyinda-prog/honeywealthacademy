'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
interface Course {
    course_code: string;
    course_description: string;
    course_title: string;
    price: number;
    level: string;
    language: string;
    accesstype: string;
    instructor_id: number;
    firstname: string;
    facebook: string;
    qualification: string;
    linkedln: string;
    course_id: number;
    course_video: string;
    imagecover: string;
    category: string;
    cart_id: number;
  }
const Page = () => {
    const [receipt, setreceipt] = useState<File|null>(null)
    const [carts, setcarts] = useState<Course[]>([])
    const [msg, setmsg] = useState('')
    const [invitercode, setinvitercode] = useState('')

useEffect(() => {
  const code=localStorage.getItem('invitercode')
   if(code){
    console.log(code);
    
    const inviter=JSON.parse(code)
    console.log(inviter);
    
    setinvitercode(inviter)
   }
   console.log(invitercode);
   
}, [])

useEffect(() => {
  console.log(invitercode);
  
}, [invitercode])


    useEffect(() => {
      
      const getcart=async()=>{
          console.log(invitercode);
            const stdid = localStorage.getItem("studentid");
            console.log(stdid);
        
            if (stdid) {
              const id = JSON.parse(stdid);
              const response = await fetch(
                "http://localhost/nextjsbackendproject/cart.php",
                {
                  method: "POST",
                  body: JSON.stringify({ studentid: id }),
                }
              );
              const data = await response.json();
              console.log(data.carts);
              if(data.status){
          setcarts(data.carts)
              }
              
            }
        
        } 
        getcart()   
        }, [])

        useEffect(() => {
          console.log(carts);
          
          
          
          
        }, [carts])
        

        // useEffect(() => {
        //     console.log(carts);
            
        //   }, [carts])
        


const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  };

  const handlesubmit=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!receipt){
        alert('please upload')
    }
    else{
        const stdid = localStorage.getItem("studentid");
            if(stdid){
                const id=JSON.parse(stdid)
                const formdata=new FormData()
                    formdata.append('receipt',receipt)
                    formdata.append('studentid',id)
                    formdata.append('invitercode',invitercode)
                    carts.forEach((cart)=>{
                        formdata.append('cart_id[]',cart.cart_id.toString())
                      })
                      carts.forEach((cart)=>{
                        formdata.append('course_id[]',cart.course_id.toString())
                      })
                    const uploadreceipt=async()=>{
                    const response=await fetch('http://localhost/nextjsbackendproject/payment.php',{
                        method:'POST',
                        body:formdata
                    })
                    const data=await response.json()
                    console.log(data);
                    if(data.status){
                      setmsg(data.msg)
                    }
                    else{
    setmsg(data.status)
                    }
                    setTimeout(() => {
                        setmsg('')
                    }, 3000);
                    }
                    uploadreceipt()
            }
    }
  }



  return (
    <>
    <div>
        <p>Bank Name: OPay</p>
        <p>Account Number:8168837642</p>
        <p>Note: Kindly type the course code(s) as the Description</p>
        <p>Once the payment has been made, click on the button below to upload payment receipt</p>
       <form action="" method="post" onSubmit={handlesubmit} >
       <input type="file" required name='payment' className='border border-amber-600 shadow'  onChange={(e)=>handleFileChange(e,setreceipt)}/>
       <button type='submit' >Upload Receipt</button>
       </form>
       <p>{msg}</p>
        Go back to <Link href='/'>Dashboard</Link> 
        
    </div>
    </>
  )
}

export default Page