'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
const Page = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [code, setcode] = useState('');
  const [msg, setmsg] = useState('')
  const [status, setstatus] = useState(false)
  const [description, setdescription] = useState('')
  const [instructorid, setinstructorid] = useState('')
  const [coursestatus, setcoursestatus] = useState(false)
  
  const [adminstatus, setadminstatus] = useState(undefined)
  const [allcomments, setallcomments] = useState<number>(0)
  
    useEffect(() => {
      const id=localStorage.getItem('instructorid')
     try {
      if(id){
        console.log(id);
        console.log(coursestatus);
        
    
    const getAllInstructors=async()=>{
  const response= await fetch("http://localhost/nextjsbackendproject/getsingleinstructor.php",{
    method:'POST',
    body:JSON.stringify({instructorid:id})
  })
 const data=await response.json()
console.log(data.instructor.adminteststatus);
setadminstatus(data.instructor.adminteststatus)    
  }
  getAllInstructors()

    }
     } 
     catch (error) {
      console.log(error);
      
     }
    
    }, [])
    
    useEffect(() => {
      console.log(adminstatus);
      
    }, [adminstatus])
    
          useEffect(() => {
              const getmsg=async()=>{
                  const id=localStorage.getItem('instructorid')
                  if(id){
                      console.log(id);
                      
                  }
                  const response=await fetch("http://localhost/nextjsbackendproject/getadmintestcomment.php",{
                method:'POST',
              body:JSON.stringify({instructorid:id})  
              })
              const data=await response.json()
              console.log(data);
              if(data.status){
             setallcomments(data.allcomments.length)
              }
               else{
      
              }
              
            }
            getmsg()
          },
      
          [])
      

      useEffect(()=> {
        const getstatus=async()=>{
          if(localStorage['instructorid']){
            const id=JSON.parse(localStorage.getItem('instructorid')!)
            setinstructorid(id)
            const response = await fetch("http://localhost/nextjsbackendproject/instructorsall.php", {
              method: "POST",
              body: JSON.stringify({instructorid:id}),
            }); 
            const data=await response.json()
            if(data.coursestatus==true){
                 setcoursestatus(true)
    
              console.log(data);
            }
            else{
               setcoursestatus(false)
       
            }
             
          }
          }
         
        getstatus()
      }, [])

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          
          
          setVideo(file); 
        } else {
          console.log("No file selected");
        }
      };
      
      
      


  const handleUpload = async () => {
    if (!title || !code || !video) {
      alert("Please fill all details");
      return;
    }
  
    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("code", code);
    formData.append("description", description);
    formData.append("instructorid", instructorid);
    
    try {
      const response = await fetch("http://localhost/nextjsbackendproject/instructortests.php", {
        method: "POST",
        body: formData,
      });
      const data = await response.json(); 
      console.log(data);
      
      if(data.status){
        setstatus(true)
        setmsg(data.msg);
        console.log('successful');
        
      }
      else{
        console.log('not successful');
        
        setmsg(data.msg)
      }
  
    
    } catch (error) {
      if(error){
        console.error("Upload failed:", error);
      }
    }
  };
  

  return (
    <>
      
<Link className='text-red-400' href='testcourse/notification'>Notification {allcomments}</Link>

      <form onSubmit={(e) => e.preventDefault()} encType='multipart/form-data' >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Code"
          onChange={(e) => setcode(e.target.value)}
        />
    
        <textarea name="description" id="" onChange={(e)=>setdescription(e.target.value)}>

        </textarea>
        
        <input type="file" onChange={handleFileChange} accept="video/*" name='video' />
        <button disabled={ adminstatus==1} type="submit" className='border border-amber-700' onClick={handleUpload}>{status?'Uploading':'Upload'}</button>
      </form>
      <p>{msg}</p>

      {
      adminstatus==1?(
        <div>
         <p>Congratulations, your test has been approved! Kindly click the link below to proceed to the next step</p> 
         <Link href={`/${instructorid}/app_center`}>Dashboard</Link>
        </div>
      ):(
        <div></div>
      )
      }

      {
        adminstatus==0 ?(
          <div>
            <p>You failed the test. Kindly restart the test. You will be notified once you passed the test</p>
          </div>
        ):(
          <div></div>
        )
      }

{
        adminstatus==null?(
          <div>
            <p>Please complete the task above</p>
          </div>
        ):(
          <div></div>
        )
      }
    </>
  );
};

export default Page;
