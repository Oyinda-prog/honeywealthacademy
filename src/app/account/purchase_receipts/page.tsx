'use client'
import Navbar from '@/components/Navbar'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useEffect, useState } from 'react'
interface Receipt{
  course_code:string,
  language:string,
  referenceid:string,
  access_type:string,
  price:number,
  level:string,
  cart_id:number
}
const Page = () => {
  const [allreceipts, setallreceipts] = useState<Receipt[]>([])
  const [msg, setmsg] = useState('')
  const refs=React.useRef<Array<HTMLDivElement|null>>([])
    useEffect(() => {
      const getreceipt=async()=>{
        const stdid = localStorage.getItem("studentid");
      if (stdid) {
        const response = await fetch(
            "http://localhost/nextjsbackendproject/transactionreceipts.php",
            {
              method: "POST",
              body:JSON.stringify({id:stdid})
            }
          );
          const data=await response.json()
          if(data.status==200){
            setallreceipts(data.receipts)
          }
          else if(data.status==201){
       setmsg(data.msg)
          }
          console.log(data);
        // const id = JSON.parse(stdid);
      }
        
          
      }
      getreceipt()
    }, [])
    
const downloadCertificate = async (index: number) => {
  const element = refs.current[index]
  if (!element) return
  
  const canvas = await html2canvas(element, {
    useCORS: true, 
    allowTaint: false,
    scale: 2, 
  })
  
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('landscape', 'pt', 'a4') 
  
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save(`certificate-${index + 1}.pdf`)
  }
  return (
    <>
    <Navbar/>
    <p>{msg}</p>
    <p className='mt-5'>
      {
         Array.isArray(allreceipts)!=true && 
          <p>No Receipts Found Yet</p>
        
      }
    </p>
    <div>
      {
        allreceipts.length>0  && Array.isArray(allreceipts) &&
        allreceipts.map((receipt,index)=>(
        
          <div key={index} className="grid text-center grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <h6>Purchase Overview</h6>
            <div ref={(el)=>{
              if(el){
              refs.current[index]=el
              }
            }} className='p-4 bg-white card'>
            <p>Course Code: {receipt.course_code}</p>
            <p>Language: {receipt.language}</p>
            <p>Amount: #{receipt.price}</p>
            <p>Transaction ID: {receipt.referenceid}</p>
            <p>Access Type: {receipt.access_type}</p>
            <p>Level: {receipt.level}</p>
            <p>id: {receipt.cart_id}</p>
            </div>
            <button onClick={()=>downloadCertificate(index)}>Download</button>
            <hr />
          </div>
        ))
      }
    </div>
    </>
  )
}

export default Page