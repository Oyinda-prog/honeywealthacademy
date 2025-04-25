'use client'

import Previewtest from "@/components/Previewtest";
import { useRouter } from "next/navigation";
import React, { useState,useEffect } from "react"

interface Course{
    course_code:string,
    course_description:string,
    course_title:string,
    course_price:number,
    level:string,
    Language:string,
    accesstype:string,
    instructor_id:number,
    course_id:number,
    course_video:string,
    course_imagecover:string,
    admin_verification:number|string,
    category:string

  }

// import React, { useState } from 'react'

const Page = () => {
    const route=useRouter()
    const [instructorid, setid] = useState('')
    const [allcourses, setallcourses] = useState([])
    const [coursecode, setcoursecode] = useState([])

    useEffect(() => {
              const id=localStorage.getItem('instructorid')
             try {
              if(id){
                console.log(id);
                setid(id)
            
            const getAllactivatedcourses=async()=>{
          const response= await fetch("http://localhost/nextjsbackendproject/allactivatedcourses.php",{
            method:'POST',
            body:JSON.stringify({id})
            
          })
         const data=await response.json()
        console.log(data.allcourses);
        if(data.status){
            console.log('yes');

            if(data.allcourses.length>0){
              const allcoursecode=data.allcourses.map((allcourses:Course)=>allcourses.course_code)
              console.log(allcoursecode);
              setcoursecode(allcoursecode)
              
                setallcourses(data.allcourses)   
            }
            
         }
         else{
            // console.log('no');
            
            
                setmsg('No courses uploaded yet. You are not permitted to create test')
            
           setInterval(() => {
             route.push('/app_center')
           }, 8000);
            
         }
        
        
          }
          getAllactivatedcourses()
        
            }
             } 
             catch (error) {
              console.log(error);
              
             }
            
            }, [])
        
        useEffect(() => {
          console.log(allcourses);
          console.log(coursecode);
          
        }, [allcourses,coursecode])
        
    
    // const [testarray, settestarray] = useState([])
    const [question, setQuestion] = useState<string>("");
    const [optionA, setOptionA] = useState<string>("");
    const [optionB, setOptionB] = useState<string>("");
    const [optionC, setOptionC] = useState<string>("");
    const [optionD, setOptionD] = useState<string>("");
    const [code, setcode] = useState<string>('')
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [msg, setmsg] = useState<string>('')
    const [componentpreveiew, setcomponentpreveiew] = useState(false)
    const [allquestions, setallquestions] = useState([])
    

     const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        
 const payload={
    question,
    answers:[optionA.toLocaleLowerCase(),optionB.toLocaleLowerCase(),optionC.toLocaleLowerCase(),optionD.toLocaleLowerCase()],
    correctanswer:selectedAnswer.toLocaleLowerCase(),
    instructorid,
    code

 }

 const newanswer=payload.answers.find((answer)=>answer===selectedAnswer.toLocaleLowerCase()); 
 console.log(newanswer);
 
 const coursec=coursecode.find((codes)=>codes===code)
 if(!newanswer){
     setmsg('Incorrect answer typed')
//   setmsg('')
 }
else if(!coursec){
   setmsg('Incorrect course code')
}
else{
    try {
        const response =await fetch("http://localhost/nextjsbackendproject/test.php", {
          method: "POST",
          body: JSON.stringify(payload),
        });

       const data=await response.json()
       setQuestion('')
       setOptionA('')
       setOptionB('')
       setOptionC('')
       setOptionD('')
       setSelectedAnswer('')

       console.log(data);
       }
     
      catch (err) {
        console.log("Error submitting form", err);
      }
    
  
}
 setTimeout(() => {
    setmsg('')
 }, 3000);
 
 
     }
     const previewquestion=async()=>{
setcomponentpreveiew(true)
try {
    const response =await fetch("http://localhost/nextjsbackendproject/previewtest.php", {
        method: "POST",
        body: JSON.stringify({instructorid,code})
      }); 
      const data=await response.json()
      if(data.status){
       console.log(data.allquestions);
       setallquestions(data.allquestions)
       
      }
      else{
setmsg('no msg yet')
      }
     
      
} catch (error) {
    console.log(error);
    
}
     }
  return (
    <>
     
    {
        !componentpreveiew?(<form onSubmit={handleSubmit}>
           <h2>Set a Question</h2>
<label htmlFor="">Enter Course Code</label>
<input type="text" placeholder="Enter course code" onChange={(e)=>setcode(e.target.value)} />
      <label>Question:</label><br />
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      /><br /><br />

    
      <label>Option A:</label><br />
      <input
        type="text"
        value={optionA}
        onChange={(e) => setOptionA(e.target.value)}
        required
      /><br />

      <label>Option B:</label><br />
      <input
        type="text"
        value={optionB}
        onChange={(e) => setOptionB(e.target.value)}
        required
      /><br />

      <label>Option C:</label><br />
      <input
        type="text"
        value={optionC}
        onChange={(e) => setOptionC(e.target.value)}
        required
      /><br />

      <label>Option D:</label><br />
      <input
        type="text"
        value={optionD}
        onChange={(e) => setOptionD(e.target.value)}
        required
      /><br /><br />

      <p>Enter the correct answer:</p>
  <input type="text" onChange={(e)=>setSelectedAnswer(e.target.value)}/>
  
            <button type="submit">Submit Question</button>
            
            <button onClick={previewquestion}>Preview Questions</button> 
            <p>{msg}</p> 
        </form>
        
    ):(
            <div>
                {
                    allquestions.map((q,i)=>(
                        <div key={i}>
                       <p>{q.question}</p>
                        </div>
                    ))
                }
                {/* <Previewtest instructorid={instructorid} coursecode={code}/> */}
            </div>
        )
    }
      </>
  )
}

export default Page