'use client'
import React, { useState } from 'react'

const Page = () => {
    const [Icon, setIcon] = useState<File|null>(null)

   
   
const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  };
  
  const uploadIcon=async()=>{
    if(Icon){
        const formdata=new FormData()
     formdata.append("icon", Icon);
        const response=await fetch("http://localhost/nextjsbackendproject/iconupload.php",{
            method:'POST',
            body:formdata
          })
          const data=await response.json()
          console.log(data);
          
    }


  }
  return (
    <>
    <div>
    <input type="file" onChange={(e) => handleFileChange(e,setIcon)} required />
    <button onClick={uploadIcon}>Upload</button>
    </div>
    </>
  )
}

export default Page