"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Course {
  course_code: string;
  course_description: string;
  course_title: string;
  price: number;
  level: string;
  language: string;
  accesstype: string;
  instructor_id: number;
  firstname: string;
  facebook: string;
  qualification: string;
  linkedln: string;
  course_id: number;
  course_video: string;
  imagecover: string;
  category: string;
  cart_id: number;
}

const Page = () => {
  const [cart, setcart] = useState<Course>();
  const param = useParams();
  const router = useRouter();

  useEffect(() => {
    const { id } = param;
    const referenceid = id;
    console.log(referenceid);
    
    const viewcourse = async () => {
      const response = await fetch(
        "http://localhost/nextjsbackendproject/viewactivatedcourse.php",
        {
          method: "POST",
          body: JSON.stringify({ referenceid }),
        }
      );
      const data = await response.json();
      console.log(data);
      
      setcart(data.cart);
    };
    viewcourse();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-gradient-to-r from-[#0A1F44] to-[#3B1C71] text-white py-12 px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold">{cart?.course_title}</h1>
            <p className="mt-3 text-lg max-w-2xl">{cart?.course_description}</p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-lg">🎓 {cart?.level}</span>
              <span className="bg-white/20 px-3 py-1 rounded-lg">🌍 {cart?.language}</span>
              <span className="bg-white/20 px-3 py-1 rounded-lg">📚 {cart?.category}</span>
              <span className="bg-white/20 px-3 py-1 rounded-lg font-semibold">₦{cart?.price}</span>
            </div>
          </div>

         
          <div className="mt-6 md:mt-0">
            <button
              onClick={() => router.push("/account")}
              className="px-6 py-2 bg-white text-[#0A1F44] font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>

      
      <div className="grid md:grid-cols-3 gap-10 px-6 md:px-16 py-10">
        
        <div className="md:col-span-2 space-y-8">
         
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <video
              src={`http://localhost/nextjsbackendproject/videos/${cart?.course_video}`}
              controls
              className="w-full h-[400px] object-cover"
            />
          </div>

          
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-3">About this course</h2>
            <p className="text-gray-700 leading-relaxed">{cart?.course_description}</p>
          </div>
        </div>

        
        <div className="space-y-6">
         
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4">Instructor</h2>
            <p className="text-gray-900 font-medium">{cart?.firstname}</p>
            <p className="text-sm text-gray-600">{cart?.qualification}</p>
            <div className="flex gap-3 mt-4">
              {cart?.facebook && (
                <a
                  href={cart.facebook}
                  target="_blank"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Facebook
                </a>
              )}
              {cart?.linkedln && (
                <a
                  href={cart.linkedln}
                  target="_blank"
                  className="text-blue-700 hover:underline text-sm"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>

         
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4">Course details</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>📌 Code: {cart?.course_code}</li>
              <li>🎓 Level: {cart?.level}</li>
              <li>🌍 Language: {cart?.language}</li>
              <li>📚 Category: {cart?.category}</li>
              <li>💵 Price: ₦{cart?.price}</li>
              <li>🔑 Access Type: {cart?.accesstype}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
