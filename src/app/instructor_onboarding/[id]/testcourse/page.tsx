'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [code, setcode] = useState('');
  const [msg, setmsg] = useState('')
  const [status, setstatus] = useState(false)
  const [description, setdescription] = useState('')
  const [instructorid, setinstructorid] = useState('')
  const [coursestatus, setcoursestatus] = useState(0)
  const [adminstatus, setadminstatus] = useState(undefined)
  const [allcomments, setallcomments] = useState<number>(0)
  const route=useRouter()
  useEffect(() => {
    const id = localStorage.getItem('instructorid')
    if (id) {
      const getAllInstructors = async () => {
        const response = await fetch("http://localhost/nextjsbackendproject/getsingleinstructor.php", {
          method: 'POST',
          body: JSON.stringify({ instructorid: id })
        })
        const data = await response.json()
        console.log(data);
        
        setadminstatus(data.instructor.adminteststatus)
        setcoursestatus(data.instructor.course_status)
      }
      getAllInstructors()
    }
  }, [])

  useEffect(() => {
    const getmsg = async () => {
      const id = localStorage.getItem('instructorid')
      const response = await fetch("http://localhost/nextjsbackendproject/getadmintestcomment.php", {
        method: 'POST',
        body: JSON.stringify({ instructorid: id })
      })
      const data = await response.json()
      if (data.status) setallcomments(data.allcomments.length)
    }
    getmsg()
  }, [])

  useEffect(() => {
    const getstatus = async () => {
      if (localStorage['instructorid']) {
        const id = JSON.parse(localStorage.getItem('instructorid')!)
        setinstructorid(id)
        const response = await fetch("http://localhost/nextjsbackendproject/instructorsall.php", {
          method: "POST",
          body: JSON.stringify({ instructorid: id }),
        }); 
        const data = await response.json()
        // setcoursestatus(data.coursestatus === true)
      }
    }
    getstatus()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0]); 
    }
  };

  const handleUpload = async () => {
    if (!title || !code || !video) {
      setmsg("Please fill all details");
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
      if(data.status){
        setstatus(true)
        setmsg(data.msg+'You will be redirected shortly');
        setTimeout(() => {
          route.push('/app_center')
        }, 3000);
      } else {
        setmsg(data.msg)
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-white p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-8 space-y-6">
      {
        msg && 
        <p className='text-center text-red-500'>{msg}</p>
      }
      {adminstatus == null && coursestatus ==0 && (
          <div className="bg-yellow-100 p-4 rounded-md text-yellow-800 font-medium text-center shadow-sm">
            <h1 className="text-2xl font-bold text-[#0A1F44] text-center">Instructor Test</h1>
            <p className="text-center text-gray-700">
              <strong>Important:</strong> You must pass this test to unlock course upload functionality. Follow the instructions carefully.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg shadow-md border-l-4 border-[#0A1F44] space-y-2">
          <h2 className="font-semibold text-[#0A1F44]">Step-by-Step Requirements:</h2>
          <ul className="list-disc list-inside text-gray-800">
            <li>Fill in the course title and code.</li>
            <li>Provide a short description.</li>
            <li>Upload a video file for the test.</li>
            <li>Wait for admin approval to access upload resources.</li>
            <li>Check notifications for feedback (<span className="font-medium text-red-600">{allcomments}</span> new comments).</li>
          </ul>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <input
              type="text"
              placeholder="Course Code"
              value={code}
              onChange={(e) => setcode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <input
              type="file"
              onChange={handleFileChange}
              accept="video/*"
              className="w-full"
            />
          </div>

          <button
            disabled={adminstatus == 1}
            onClick={handleUpload}
            className={`w-full py-3 rounded-md font-semibold text-white transition ${
              adminstatus == 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0A1F44] hover:bg-blue-900'
            }`}
          >
            {status ? 'Uploading...' : 'Upload'}
          </button>
        </form>

            <p>Please complete the task above to unlock course uploads.</p>
          </div>
        )}
      

      
        
        <p className="text-center font-medium text-red-600">{msg}</p>

       
        {adminstatus == 1 && coursestatus == 1 && (
          <div className="bg-green-100 p-4 rounded-md text-green-800 font-medium text-center shadow-sm">
            <p>Congratulations! Your test has been approved. You can now proceed to your dashboard.</p>
            <Link href='/' className="text-[#0A1F44] hover:underline">Go to Dashboard</Link>
          </div>
        )}

        {adminstatus == 0 && coursestatus == 1 && (
          <div className="bg-red-100 p-4 rounded-md text-red-800 font-medium text-center shadow-sm">
            <p>You failed the test. Kindly restart the test. You will be notified once you pass.</p>
          </div>
        )}

        

{coursestatus == 1 && adminstatus == null && (
          <div className="bg-yellow-100 p-4 rounded-md text-yellow-800 font-medium text-center shadow-sm">
            <p>
Please check back later. Approval typically takes 24–72 hours.
</p>
          </div>
        )}
 <div>
  <Link
    href={`/instructor_onboarding/onboardingtrue=${instructorid}`}
    className="inline-block px-6 py-2 bg-[#0A1F44] text-white font-semibold rounded-md shadow hover:bg-blue-800 transition"
  >
    Previous
  </Link>
</div>

       
      </div>
    </div>
  );
};

export default Page;
