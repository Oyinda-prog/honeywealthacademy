'use client'
import React, { useEffect, useState } from 'react'
interface Comments{
    comment_id:number,
    instructor_id:number,
    comment:string,
    date_created:string
}

const Page = () => {
const [allcomments, setallcomments] = useState<Comments[]>([])
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
       setallcomments(data.allcomments)
        }
         else{

        }
        
      }
      getmsg()
    },

    [])
    
  return (
    <>
<div>
    {
        allcomments.map((comments,index)=>(
            <div key={index}>
          <h1>{index+1}</h1>
          <p>{comments.comment}</p>
          <p>{comments.date_created}</p>
          <hr />
            </div>
        ))
    }
</div>
    </>
  )
}

export default Page