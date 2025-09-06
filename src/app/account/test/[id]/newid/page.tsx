'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
interface courseactivated{
    course_code:string,
    course_title:string,
    couponcode:string,
    trackingid:string,
    referenceid:string,
    firstname:string,
    lastname:string,
    gender:string,
    imagecover:string,
    course_id:number
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
const Page = () => {
    // const route=useRouter()
    const [accesscode, setaccesscode] = useState('')
    const [course, setcourse] = useState<courseactivated>()
    const [testcomponent, settestcomponent] = useState(false)
   const [msg, setmsg] = useState('')
   const [allquestions, setallquestions] = useState<Questions[]>([])
    const param=useParams()
    const {id}=param
    
  useEffect(() => {
    try {
        const stdid = localStorage.getItem("studentid");
        if (stdid) {
          const studentid = JSON.parse(stdid);
          const gettest=async()=>{
            const res=await fetch('http://localhost/nextjsbackendproject/studenttest.php',{
              method:'POST',
              body:JSON.stringify({studentid,courseid:id})
              })
              const data=await res.json()
              if(data.status){
                
                setcourse(data.coursesactivated)
              }
              const response=await fetch('http://localhost/nextjsbackendproject/studentwritetest.php',{
                method:'POST',
                body:JSON.stringify({courseid:id})
                })
                const dat=await response.json()
                console.log(dat.allquestion);
                
                if(dat.status){
                    setallquestions(dat.allquestions)
                }
                else{
                    setmsg('No questions found')
                }
                console.log(dat);
                
   
          }
         gettest()
        }
  
      } 
      catch (error) {
        console.log(error);
      } 
  }, [])
  useEffect(() => {
    console.log(allquestions);
    
  }, [allquestions])
  const [currentpage, setcurrentpage] = useState(0)
    const questionnumber=4
    const startindex=currentpage*questionnumber
    const endindex=startindex+questionnumber
    const questionstomap=allquestions.slice(startindex,endindex)
    useEffect(() => {
      console.log(questionstomap);
      
    }, [questionstomap])
    
  
  
    const submitaccesscode=async()=>{
        const res=await fetch('http://localhost/nextjsbackendproject/couponcodeconfirmation.php',{
            method:'POST',
            body:JSON.stringify({couponcode:accesscode})
            })
            const data=await res.json()
            console.log(data);
            
            if(data.status){
                settestcomponent(true)
            }
            else{
                setmsg('Incorrect Access Code Entered')
            }
          setTimeout(() => {
            setmsg('')
          }, 3000);
        // console.log(course?.couponcode);
        
        // alert(23)
    }
    const [newanswer, setnewanswer] = useState< string[]>([]);
    const [total, settotal] = useState(0)
    let totalcount=0
         const submitquestion=(e:React.FormEvent)=>{
           e.preventDefault()
         allquestions.forEach((question,index)=>{
          if(newanswer[index]===question.selected_answer){
            totalcount++
            // settotal(prevTotal=>prevTotal+1)
          }
         })
         settotal(totalcount); 
         const percentage = (totalcount / allquestions.length) * 100;
         console.log(`Total correct answers: ${totalcount}`);
         console.log(`Percentage: ${percentage.toFixed(2)}%`);
         console.log(total);
         
       };
    //    const handleNext=()=>{
    //     if(newanswer.length<questionstomap.length){
    //         alert('select all fields')
    //     }
    //     else{
    //         setcurrentpage((prev)=>prev+1)
    //         // alert(1)
    //     }
    //    }
    const handleNext = () => {
        let isValid = true;
    
        // Ensure all answers are selected for the current page
        for (let index = startindex; index < endindex && index < allquestions.length; index++) {
          if (!newanswer[index]) {
            isValid = false;
            break;
          }
        }
    
        if (!isValid) {
          alert('Please choose all options');
        } else {
          setcurrentpage((prev) => prev + 1);
        }
    };
    
  return (
    <>
  {
    !testcomponent?(
        <div>
        <p>Exam Title: {course?.course_title}</p>
       <p>Candidate Name: {course?.firstname} {course?.lastname}</p>
       <p>Gender: {course?.gender}</p>
       <p>Exam Access Code:{course?.couponcode}</p>
       <p>Instructions Before You Begin:</p>
       <p>Duration: You have 40 minutes to complete this exam.</p>
       <p>Number of Questions: [Insert Number of Questions]</p>
       <p>Question Types: Multiple choice</p>
       
       <p>Passing Score:70%</p>
       
       <p>Important Guidelines:</p>
       <p><b>Do not refresh or close your browser during the exam.</b></p>
       
       <p>Each question must be answered before moving to the next one.</p>
       <p>Ensure you have a stable internet connection before starting.</p>
       
       <p>Test Behavior:The timer will begin once you click Start Exam.</p>
       
       <p><b>The exam will automatically submit once the time is over.</b></p>
       
       {/* You may only attempt this exam [Once/Twice/Unlimited Attempts] based on your settings. */}
       {/* Please enter your Exam Access Code to begin. This code is unique to your test session */}
       <p>Please enter your Exam Access Code to begin. This code is unique to your test session</p>
       <input type="text" onChange={(e)=>setaccesscode(e.target.value)} />
       <button type='submit' onClick={submitaccesscode} style={{cursor:'pointer'}}>Verify Access Code</button>
       <p>{msg}</p>
           </div>
    ):(
      
      <div>
        {
          questionstomap.map((question,index)=>(
            <div key={index}>
              
              <p><span>{index+1}</span>. {question.question}</p>
              {question.answers.map((answer,i)=>(
            <div key={i}>
    <input type="radio" name={`answer_${index}`} value={answer} 
    onChange={(e)=>setnewanswer((prev)=>{
      const updatedAnswers=[...prev];
      updatedAnswers[startindex+index]=e.target.value;
      return updatedAnswers
    })}
     className='m-5'/>
     <label htmlFor="">{answer}</label>
    
            </div>
              ))}
              <p>SELECTED ASNWER:{newanswer[index]}</p>

            </div>
          ))  
     }
     <button onClick={()=>setcurrentpage((prev)=>prev-1)}>Prev</button>
     {/* {
        endindex<allquestions.length?(
            <button onClick={handleNext}>Next</button>
        ):(
            <button onClick={(e)=>submitquestion(e)}>Submit Question</button>
        )
     }
         */}

        {endindex < allquestions.length ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={(e) => submitquestion(e)}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Submit Test
                </button>
              )}
      </div>
      
    )
    
  }
   
    </>
  )
}

export default Page