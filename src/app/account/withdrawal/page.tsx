'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const Page = () => {
    const [amount, setamount] = useState('')
    // const [pin,setpin]=useState('')
    const [bankname, setbankname] = useState('')
    const [accountnumber, setaccountnumber] = useState('')
    const [holdername, setholdername] = useState('')
   const route=useRouter()
   const [id, setid] = useState('')
   const [balance, setbalance] = useState('')
   const [pin, setpin] = useState<number>(0)
   const [userpin, setuserpin] = useState<number>(0)
   const [msg, setmsg] = useState('')
   const transactionid=Math.round(Math.random()*2456789000000000)+'wd'+Math.round(Math.random()*2456789000000000)
   
    useEffect(() => {
        const getuser=async()=>{
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
                  setid(stdid)
                  setbalance(data.balance)
                  setuserpin(data.pin)
                  }
                  else{
                    route.push('/student_login')
                  } 
                  console.log(data.status);
                  
              }
        }
        getuser()
    
        
    }, [])
    useEffect(() => {
      console.log(balance);
      console.log(userpin);
       
      
    }, [balance,userpin])
    const values={amount,bankname,accountnumber,holdername,transactionid,id}
    
const handlesubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
// console.log(values);

 if(amount>balance){

   setmsg('insufficient funds'); 
 }
 else if(String(pin).length!==4){
setmsg('Enter 4 digits pin');

 }
 else if(userpin==0){
     setmsg('Transaction pin is yet to be set');
     
 }
 else if(userpin!=pin){
  setmsg('enter your 4-digits transaction pin');
  
 }
 else{
  const res=await fetch('http://localhost/nextjsbackendproject/withdraw.php',{
         method:'POST',
            body:JSON.stringify(values)
             })
    const data=await res.json()
    if(data.status){
      setmsg(data.msg)
      setInterval(() => {
        route.push('/account')
      }, 5000);
    }
    else{
      setmsg(data.msg)
    }
    // console.log(data);
    
  
  
  
 }
  setTimeout(() => {
    setmsg('')
  }, 5000);
    }
  return (
    <>
    <form onSubmit={(e)=>handlesubmit(e)} > 
        <p>Cash Withdrawal</p>
        <label htmlFor="">Recipient Account Number</label>
        <input type="text" onChange={(e)=>setaccountnumber(e.target.value)} placeholder='10-digit account number'/>
        <label htmlFor="">Recipient Bank Name</label>
        <input type="text" onChange={(e)=>setbankname(e.target.value)}/>
        <label htmlFor="">Account Holder&apos;s Name: </label>
        <input type="text" onChange={(e)=>setholdername(e.target.value)}/>
        <label htmlFor="">Amount</label>
        <input type="number" onChange={(e)=>setamount(e.target.value)}/>
        <input type="number" onChange={(e)=>setpin(Number(e.target.value))}/>
        <button type='submit'>Withdraw</button>
    </form> 
    <div>{msg}</div>
    </>
  )
}

export default Page