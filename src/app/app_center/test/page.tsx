'use client'

// import Previewtest from "@/components/Previewtest";
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
  interface Questions{
    answers:string[],
    course_id:number,
    datecreated:string,
    instructor_id:number,
    previewtest_id:number,
    question:string,
    selected_answer:string,
    status:string
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
    // const [newanswer, setnewanswer] = useState('')
    const [msg, setmsg] = useState<string>('')
    const [componentpreveiew, setcomponentpreveiew] = useState(false)
    const [allquestions, setallquestions] = useState<Questions[]>([])
    // const [newanswer, setnewanswer] = useState<{ [key: number]: string }>({});
    const [newanswer, setnewanswer] = useState< string[]>([]);
    
const [courseid, setcourseid] = useState('')
    
const sendcodebackend=async(codes:string)=>{
  if(codes.length>0){

    const response =await fetch("http://localhost/nextjsbackendproject/coursecode.php", {
      method: "POST",
      body: JSON.stringify({coursecode:codes}),
    });
    const data=await response.json()
    console.log(data);
    
    console.log(data.allusers?.course_id);
    if(data.status){
      
      // setcourseobj(data)
      setcourseid(data.allusers?.course_id)
    }
    // console.log(courseid);
    
    // console.log(courseobj['course_id']);
    // set
  } 
}
     const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        
 const payload={
    question,
    answers:[optionA.toLocaleLowerCase(),optionB.toLocaleLowerCase(),optionC.toLocaleLowerCase(),optionD.toLocaleLowerCase()],
    correctanswer:selectedAnswer.toLocaleLowerCase(),
    instructorid,
    code,
    courseid

 }
//  console.log(payload);
 
 const newanswer=payload.answers.find((answer)=>answer===selectedAnswer.toLocaleLowerCase()); 
//  console.log(newanswer);
 
 const coursec=coursecode.find((codes)=>codes===code)
 if(code.length===0){
  setmsg('Please enter course code')
}
else if(question.length===0){
  setmsg('Enter question')
}
 else if(optionA.length===0 || optionB.length===0 || optionC.length===0 || optionD.length===0){
  setmsg('Please Enter options')
}
 else if(selectedAnswer.length===0){
     setmsg('This field is required')
//   setmsg('')
 }
 else if(!newanswer){
  setmsg('Type Correct Answer from the options provided above')
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
      if(code.length===0){
        setmsg('Please enter course code')
      }
      else if(courseid===undefined){
       setmsg('Please enter correct course code')
      }
      
      else{
        setcomponentpreveiew(true)
        try {
            const response =await fetch("http://localhost/nextjsbackendproject/previewtest.php", {
                method: "POST",
                body: JSON.stringify({instructorid,courseid})
              }); 
              const data=await response.json()
              // console.log(data);
              
              if(data.status){
               console.log(data.allquestions);
               setallquestions(data.allquestions)
               
              }
              else{
        setmsg(data.msg)
              }
             
              
        } catch (error) {
            console.log(error);
            
        }
      }
      setTimeout(() => {
        setmsg('')
      }, 3000);
     }
     const del=async(id:number)=>{
      try {
        const response =await fetch("http://localhost/nextjsbackendproject/deletequestion.php", {
          method: "POST",
          body: JSON.stringify({id})
        }); 
        const data=await response.json()
        if(data.status){
          const response =await fetch("http://localhost/nextjsbackendproject/previewtest.php", {
            method: "POST",
            body: JSON.stringify({instructorid,courseid})
          }); 
          const data=await response.json()
          if(data.status){
            console.log(data.allquestions);
            setallquestions(data.allquestions)
            
           }

        }
        else{

        }
        // console.log(data);
        
      } 
      catch (error) {
       console.log(error);
        
      }
// console.log(id);

     }
    //  const total=0
    const [total, settotal] = useState(0)
     const submitquestion=(e:React.FormEvent)=>{
       e.preventDefault()
      // console.log(newanswer);
      let totalcount=0
     allquestions.forEach((question,index)=>{
      // newanswer.length
      if(newanswer[index]===question.selected_answer){
        totalcount++
        // settotal(prevTotal=>prevTotal+1)
      }
     })
     settotal(totalcount); 
     const percentage = (totalcount / allquestions.length) * 100;
     console.log(`Total correct answers: ${totalcount}`);
     console.log(`Percentage: ${percentage.toFixed(2)}%`);
   };
      // console.log(234);
    const finalize=async()=>{
      if(code.length===0){
        setmsg('Please enter course code')
      }
      else if(courseid===undefined){
       setmsg('Please enter correct course code')
      }  
      else{
 try {
  const response =await fetch("http://localhost/nextjsbackendproject/testuploadverification.php", {
    method: "POST",
    body: JSON.stringify({instructorid,courseid})
  }); 
  const data=await response.json()
  if(data.status){
    setmsg(data.msg)
  }
  else{
    setmsg(data.msg)
  }
  setTimeout(() => {
    setmsg('')
  }, 3000);
  // console.log(data);

 } 
 catch (error) {
  console.log(error);
  
 }
      }  
            
    }  
    const backquestion=()=>{
      setcomponentpreveiew(false)
    } 
  return ( 
    <>
     
    {
        !componentpreveiew?(<form onSubmit={handleSubmit}>
           <h2>Set a Question</h2>
<label htmlFor="">Enter Course Code</label>
<input type="text" placeholder="Enter course code" onChange={(e)=>{setcode(e.target.value);
  sendcodebackend(e.target.value)
}} />
      <label>Question:</label><br />
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      
      /><br /><br />

    
      <label>Option A:</label><br />
      <input
        type="text"
        value={optionA}
        onChange={(e) => setOptionA(e.target.value)}
        
      /><br />

      <label>Option B:</label><br />
      <input
        type="text"
        value={optionB}
        onChange={(e) => setOptionB(e.target.value)}
        
      /><br />

      <label>Option C:</label><br />
      <input
        type="text"
        value={optionC}
        onChange={(e) => setOptionC(e.target.value)}
        
      /><br />

      <label>Option D:</label><br />
      <input
        type="text"
        value={optionD}
        onChange={(e) => setOptionD(e.target.value)}
        
      /><br /><br />

      <p>Enter the correct answer:</p>
  <input type="text" onChange={(e)=>setSelectedAnswer(e.target.value)}/>
  
            <button type="submit">Save Question</button><br />
            
            <button onClick={previewquestion} type="button">Preview Saved Questions</button> <br />
            <button onClick={finalize} type="button">Finalize Questions</button> 

        </form>
        
      ):(
        <div>
                {
                  allquestions.map((q,index)=>(
                    <div key={index}>
                         <h2>{index+1}</h2>
                       <p>{q.question}</p>
                          {q.answers.map((answer,i)=>(
                            <div key={i}>
                              <input type="radio" name={`answer_${index}`}  value={answer}
                               onChange={(e) => 
                                setnewanswer((prev) => {
                                  const updatedAnswers = [...prev]; 
                                  updatedAnswers[index] = e.target.value; 
                                  return updatedAnswers;
                                })
                              }
                              />
                              <label htmlFor="">{answer}</label>
                             
                              {/* <label htmlFor=""></label> */}
                             
                            </div>
                          ))}
                          <button onClick={()=>del(q.previewtest_id)}>Delete</button>
                           <p><span>CORRECT Answer:{q.selected_answer}</span></p>
                           <p>SELECTED ASNWER:{newanswer[index]}</p>
                        </div>
                    ))
                  }
                {/* <Previewtest instructorid={instructorid} coursecode={code}/> */}
                
                <button onClick={(e)=>submitquestion(e)}>Submit Question</button>
                <button onClick={finalize} type="button">Finalize Questions</button> 
                <button onClick={backquestion}>Back</button>
            </div>
            
        )
      }
    <p>total score:{total}</p>
      <p>{msg}</p> 
      </>
  )
}

export default Page