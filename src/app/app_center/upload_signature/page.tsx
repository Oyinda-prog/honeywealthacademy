'use client'

// import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
const Page = () => {
  const [instructorid, setinstructorid] = useState('')
  useEffect(() => {
    const id=localStorage.getItem('instructorid')
         
          if(id){
            console.log(id);
            setinstructorid(id)
          }
  }, [])
  useEffect(() => {
    console.log(instructorid);
    
  }, [instructorid])
  
  
    const sigPadRef = useRef<SignaturePad>(null);
    const [signatureURL, setSignatureURL] = useState('');
  
    const clear = () => sigPadRef.current?.clear();
  
    const save = async() => {
      const dataURL = sigPadRef.current?.toDataURL();
      setSignatureURL(dataURL || '');
      if(dataURL){
        const response= await fetch("http://localhost/nextjsbackendproject/signatureupload.php",{
          method:'POST',
          body:JSON.stringify({signature:dataURL,instructorid})
        })
       const data=await response.json()
       console.log(data);
       
      }
      
    };
  const show=()=>{
      console.log(signatureURL);
      
  }
  // const show = () => {
  //   console.log(signatureURL?.split(',')[1]); // just base64 content
  // };
  
  return (
    <>
<div>
      <h2>Draw Your Signature</h2>
      <SignaturePad
        ref={sigPadRef}
        canvasProps={{
          width: 400,
          height: 200,
          className: 'border border-gray-400 rounded-md',
        }}
      />
      <button onClick={clear} className="mt-2 px-4 py-1 bg-red-500 text-white rounded">Clear</button>
      <button onClick={save} className="ml-2 mt-2 px-4 py-1 bg-green-500 text-white rounded">Save</button>

      {signatureURL && (
        <div className="mt-4">
          <p>Saved Signature Preview:</p>
          {/* <img src={signatureURL} alt="Signature Preview" className="border border-black" /> */}
          
        </div>
      )}
    </div>
    <p>
      <button onClick={show}>Show</button>
    </p>
    </>
  )
}

export default Page