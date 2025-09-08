'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Comments{
    comment_id:number,
    instructor_id:number,
    comment:string,
    date_created:string
}

const Page = () => {
    const [allcomments, setallcomments] = useState<Comments[]>([])
    const [commentlength, setcommentlength] = useState(0)
const route=useRouter()

  useEffect(() => {
    const id = localStorage.getItem("instructorid");
    if (!id) {
      route.push('/')
    }
  }, []);
    useEffect(() => {
        const getmsg = async () => {
            const id = localStorage.getItem('instructorid')
            if(id){ console.log(id); }

            const response = await fetch("http://localhost/nextjsbackendproject/getadmintestcomment.php",{
                method:'POST',
                body:JSON.stringify({instructorid:id})  
            })
            const data = await response.json()
            console.log(data)
            if(data.status){
                setallcomments(data.allcomments)
                setcommentlength(data.allcomments.length)
            }
        }
        getmsg()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
                
             
                <div className="flex items-center justify-between mb-6">
                    <button 
                        className="px-4 py-2 bg-[#0A1F44] text-white rounded-lg shadow hover:bg-[#072039]"
                        onClick={() => route.push('/app_center')}
                    >
                        Dashboard
                    </button>

                    <div className="relative">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                            View Comments
                        </button>
                        {commentlength > 0 && (
                            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                {commentlength}
                            </span>
                        )}
                    </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                    {allcomments.map((comments,index) => (
                        <div key={index} className="p-4 border rounded-lg bg-gray-50">
                            <h3 className="font-semibold text-gray-800">{index + 1}</h3>
                            <p className="text-gray-700">{comments.comment}</p>
                            <p className="text-gray-500 text-sm">{comments.date_created}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page
