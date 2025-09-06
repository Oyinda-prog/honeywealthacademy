'use client'
import { useParams, useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'


interface courseactivated {
  course_code: string,
  course_title: string,
  couponcode: string,
  trackingid: string,
  referenceid: string,
  firstname: string,
  lastname: string,
  gender: string,
  imagecover: string,
  course_id: number,
  studentcbt_status:string,
  instructor_signature:string
}
interface Questions {
  answers: string[],
  course_id: number,
  datecreated: string,
  instructor_id: number,
  previewtest_id: number,
  question: string,
  selected_answer: string,
  status: string
}

const Page = () => {
  const route=useRouter()
  const [icon, seticon] = useState('')
  const [accesscode, setaccesscode] = useState('')
  const [course, setcourse] = useState<courseactivated>()
  const [testcomponent, settestcomponent] = useState(false)
  const [msg, setmsg] = useState('')
  const [allquestions, setallquestions] = useState<Questions[]>([])
  const [newanswer, setnewanswer] = useState<string[]>([])
  
  const [currentPage, setcurrentPage] = useState(0) 
  const questionsPerPage = 4; 
  const [remainingTime, setRemainingTime] = useState(1* 60); 
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
const [studid, setstudid] = useState('')
  const param = useParams()
  const { id } = param

  useEffect(() => {
   
    try {
      const stdid = localStorage.getItem("studentid");
      if (stdid) {
        const studentid = JSON.parse(stdid);
        setstudid(studentid)
        const gettest = async () => {
          const res = await fetch('http://localhost/nextjsbackendproject/studenttest.php', {
            method: 'POST',
            body: JSON.stringify({ studentid, courseid: id })
          })
          const data = await res.json()
          console.log(data);
          
          if (data.status) {
            console.log(data.coursesactivated);
            
            setcourse(data.coursesactivated)
          }
          const response = await fetch('http://localhost/nextjsbackendproject/studentwritetest.php', {
            method: 'POST',
            body: JSON.stringify({ courseid: id })
          })
          const dat = await response.json()
          if (dat.status) {
            setallquestions(dat.allquestions)
          } else {
            setmsg('No questions found')
          }
        }
        gettest()
      }
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
   const geticon=async()=>{
    const response = await fetch('http://localhost/nextjsbackendproject/icondisplay.php', {
      method: 'GET',
    })
    const dat = await response.json()
    seticon(dat.icon)
    console.log(dat.icon);
    
   }
geticon()
    
  }, [course])
  
  
  useEffect(() => {
    
    if (remainingTime <= 0 && timerId) {
     
      clearInterval(timerId);
      if(course?.studentcbt_status==='Failed'){
        updateSubmit();
        setmsg('You have finished the exam, and your form has been submitted automatically')
      setInterval(() => {
        route.push('/account')
      }, 6000);
        console.log('update');
        
      }
       else if(course?.studentcbt_status===null){
        // console.log('former');
        // setmsg('You have finished the exam, and your form has been submitted automatically')
        submitquestion()
      setInterval(() => {
        route.push('/account')
      }, 6000);
        console.log('new submission');
       } 
      
    }

  }, [remainingTime, timerId]);

  
  useEffect(() => {
    if (testcomponent) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
      setTimerId(timer); 
      return () => clearInterval(timer);
    }
  }, [testcomponent]);

  const submitaccesscode = async () => {
    const res = await fetch('http://localhost/nextjsbackendproject/couponcodeconfirmation.php', {
      method: 'POST',
      body: JSON.stringify({ couponcode: accesscode })
    })
    const data = await res.json()
    if (data.status) {
      settestcomponent(true)
    } else {
      setmsg('Incorrect Access Code Entered')
    }
    setTimeout(() => {
      setmsg('')
    }, 3000);
  }

  const submitquestion = async(e?: React.FormEvent) => {
    if (e) e.preventDefault();

    let total = 0;
    allquestions.forEach((question, index) => {
      if (newanswer[index] === question.selected_answer) {
        total++;
      }
    });
    
    const percentage:number = (total / allquestions.length) * 100;
    console.log(`Total correct answers: ${total}`);
    console.log(`Percentage: ${percentage.toFixed(2)}%`);
    const newpercentage=percentage.toFixed(2)
    
    
      const payload={
   courseid:id,
   studentid:studid,
   score:total,
   percentage:newpercentage,
   status:percentage>49?'Passed':'Failed'
      }
      const res = await fetch('http://localhost/nextjsbackendproject/studentcbt.php', {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      console.log(data.value);
      if(data){
        setmsg('Test submitted successfully')
       
    
     }
    
  };

const updateSubmit=async(e?:React.FormEvent)=>{
  if (e) e.preventDefault();

  let total = 0;
  allquestions.forEach((question, index) => {
    if (newanswer[index] === question.selected_answer) {
      total++;
    }
  });
  
  const percentage:number = (total / allquestions.length) * 100;
  console.log(`Total correct answers: ${total}`);
  console.log(`Percentage: ${percentage.toFixed(2)}%`);
  const newpercentage=percentage.toFixed(2)
  
  
    const payload={
 courseid:id,
 studentid:studid,
 score:total,
 percentage:newpercentage,
 status:percentage>49?'Passed':'Failed'
    }
    const res = await fetch('http://localhost/nextjsbackendproject/studentcbtupdate.php', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if(data.value==='Passed'){
      const year=new Date().getFullYear()
      const certificateobj={
   certificateid:'OC-'+year+'-'+course?.course_code+'-'+Math.round(Math.random()*900000000)+Math.round(Math.random()*10000),
   coursetitle:course?.course_title,
   instructorsignature:course?.instructor_signature,
   studentname:course?.firstname+' '+course?.lastname,
   icon:icon,
   studentid:studid,
   courseid:course?.course_id
      }
      const res = await fetch('http://localhost/nextjsbackendproject/createcertificate.php', {
        method: 'POST',
        body: JSON.stringify(certificateobj)
      })
      const data = await res.json()
      console.log(data);
      
      // console.log(certificateobj);
      
    }
    else{
console.log('failed');

    }
    console.log(data.value);
}

  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = allquestions.slice(startIndex, endIndex);

  const handleNext = () => {
    let isValid = true;

    
    for (let index = startIndex; index < endIndex && index < allquestions.length; index++) {
      if (!newanswer[index]) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      alert('Please choose all options');
    } else {
      setcurrentPage((prev) => prev + 1);
    }
  };


  return (
    <>
    <div>
                  {
                    course?.studentcbt_status==='Failed'?(
                      <div>You are retaking the test because you didnt pass on your previous attempt</div>
                    ):(
                      <p>

                        Write test
                      </p>
                    )
                  }
                </div>
      {
        !testcomponent ? (
          <div>
            <p>Exam Title: {course?.course_title}</p>
            <p>Candidate Name: {course?.firstname} {course?.lastname}</p>
            <p>Gender: {course?.gender}</p>
            <p>Exam Access Code: {course?.couponcode}</p>
            <p>Instructions Before You Begin:</p>
            <p>Duration: You have 40 minutes to complete this exam.</p>
            <p>Question Types: Multiple choice</p>
            <p>Passing Score: 70%</p>
            <p><b>Do not refresh or close your browser during the exam.</b></p>
            <p>Please enter your Exam Access Code to begin:</p>
            <input type="text" onChange={(e) => setaccesscode(e.target.value)} />
            <button type='submit' onClick={submitaccesscode} style={{ cursor: 'pointer' }}>Verify Access Code</button>
            <p>{msg}</p>
          </div>
        ) : (
          <div>
            <div>
              <p>Time Remaining: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60}</p>
            </div>
            {
              currentQuestions.map((question, index) => (
                <div key={startIndex + index}>
                  <p><span>{startIndex + index + 1}</span>. {question.question}</p>
                  {question.answers.map((answer, i) => (
                    <div key={i}>
                      <input
                        type="radio"
                        name={`answer_${startIndex + index}`}
                        value={answer}
                        onChange={(e) => setnewanswer((prev) => {
                          const updatedAnswers = [...prev];
                          updatedAnswers[startIndex + index] = e.target.value;
                          return updatedAnswers;
                        })}
                        className='m-5'
                        checked={newanswer[startIndex + index] === answer}
                      />
                      <label>{answer}</label>
                    </div>
                  ))}
                  <p>Selected Answer: {newanswer[startIndex + index]}</p>
                </div>
              ))
            }
            
            <div className="flex gap-4 mt-4">
              <button
                disabled={currentPage === 0}
                onClick={() => setcurrentPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>

              {endIndex < allquestions.length ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Next
                </button>
              ) : (
                <div>
                  {
                    course?.studentcbt_status!='Failed'?(
                      <button
                        onClick={(e) => submitquestion(e)}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                       >
                         Submit Test
                      </button>
                    ):(
                      <p>

                        <button type='button' onClick={(e)=>updateSubmit(e)}>Resubmit Test</button>
                      </p>
                    )
                  }
                </div>
                //          
                 
              )
              }
            </div>
          </div>
        )
      }
      
    </>
  )
}

export default Page;
