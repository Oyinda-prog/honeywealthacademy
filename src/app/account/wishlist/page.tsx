"use client";
// import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Course {
  course_code: string;
  course_description: string;
  course_title: string;
  course_price: number;
  level: string;
  Language: string;
  accesstype: string;
  instructor_id: number;
  course_id: number;
  course_imagecover: string;
  category: string;
  admin_verification: number;
  course_video: string;
  facebook: string;
  linkedln: string;
  firstname: string;
  qualification: string;
  wishlist_id: number;
}

const Page = () => {
  const [allcourses, setallcourses] = useState<Course[]>([]);
  const [studentid, setstudentid] = useState("");
  const [invitercode, setinvitercode] = useState("");
  const [msg, setmsg] = useState("");

  useEffect(() => {
    const code = localStorage.getItem("invitercode");
    if (code) setinvitercode(JSON.parse(code));

    const getwishlist = async () => {
      const stdid = localStorage.getItem("studentid");
      if (stdid) {
        const id = JSON.parse(stdid);
        setstudentid(id);
        const res = await fetch(
          "http://localhost/nextjsbackendproject/wishliststudents.php",
          {
            method: "POST",
            body: JSON.stringify({ studentid: id }),
          }
        );
        const data = await res.json();
        if (data.status == 200) setallcourses(data.allwishlists);
        if (data.status != 200) setmsg(data.msg);
      }
    };
    getwishlist();
  }, []);

  const addCart = async (
    course_id: number,
    instructor_id: number,
    Language: string,
    accesstype: string,
    admin_verification: number,
    category: string,
    course_code: string,
    course_description: string,
    course_imagecover: string,
    course_title: string,
    course_price: number,
    course_video: string,
    qualification: string,
    firstname: string,
    level: string,
    facebook: string,
    linkedln: string
  ) => {
    const obj = {
      course_id,
      instructor_id,
      studentid,
      invitercode,
      linkedln,
      Language,
      accesstype,
      admin_verification,
      category,
      course_code,
      course_description,
      course_imagecover,
      course_title,
      course_price,
      course_video,
      qualification,
      firstname,
      level,
      facebook,
    };

    if (course_id && instructor_id && studentid) {
      const response = await fetch(
        "http://localhost/nextjsbackendproject/order.php",
        { method: "POST", body: JSON.stringify(obj) }
      );
      const data = await response.json();
      setmsg(data.msg);
      setTimeout(() => setmsg(""), 3000);
    } else setmsg("Not eligible");
  };

  const removewishlist = async (
    course_id: number,
    instructor_id: number,
    wishlist_id: number
  ) => {
    const response = await fetch(
      "http://localhost/nextjsbackendproject/deletewishlist.php",
      { method: "POST", body: JSON.stringify({ course_id, instructor_id, wishlist_id }) }
    );
    const data = await response.json();

    if (data.status === 200) {
      const res = await fetch(
        "http://localhost/nextjsbackendproject/wishliststudents.php",
        { method: "POST", body: JSON.stringify({ studentid: studentid }) }
      );
      const data = await res.json();
      if (data.status == 200) setallcourses(data.allwishlists);
    }
    setmsg(data.msg);
    setTimeout(() => setmsg(""), 3000);
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
     
      <aside className="w-full sm:w-64 bg-gray-50 border-r p-6">
        <h2 className="text-lg font-semibold mb-6">My Learning</h2>
        <nav className="space-y-4">
          <Link href="/" className="block text-gray-700 hover:text-blue-700">🏠 Home</Link>
          <Link href="/account/wishlist" className="block text-gray-700 hover:text-blue-700">❤️ Wishlist</Link>
          <Link href="/cart" className="block text-gray-700 hover:text-blue-700">🛒 Cart</Link>
          <Link href="/account/personal" className="block text-gray-700 hover:text-blue-700">👤 Personal</Link>
        </nav>
      </aside>

      
      <main className="flex-1 p-4 sm:p-6">
        <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
        {msg && <p className="text-center text-blue-900 font-medium mb-6">{msg}</p>}

        {allcourses.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No courses in your wishlist yet 💔</p>
            <Link href="/" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allcourses.map((course, index) => (
              <div key={index} className="flex flex-col p-4 rounded-lg shadow-md border hover:shadow-lg transition bg-white min-w-[200px]">
                <Image
                  src={`http://localhost/nextjsbackendproject/images/${course.course_imagecover}`}
                  unoptimized
                  width={300}
                  height={200}
                  alt="Course cover"
                  className="object-cover w-full h-40 rounded-md"
                />
                <h3 className="mt-3 font-semibold text-gray-800">{course.course_title}</h3>
                <p className="text-sm text-gray-500">{course.category}</p>
                <p className="text-sm text-gray-500">{course.level}</p>
                <p className="text-sm text-gray-500">{course.Language}</p>
                <p className="font-bold mt-2">₦{course.course_price}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => addCart(
                      course.course_id,
                      course.instructor_id,
                      course.Language,
                      course.accesstype,
                      course.admin_verification,
                      course.category,
                      course.course_code,
                      course.course_description,
                      course.course_imagecover,
                      course.course_title,
                      course.course_price,
                      course.course_video,
                      course.qualification,
                      course.firstname,
                      course.level,
                      course.facebook,
                      course.linkedln
                    )}
                    className="flex-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removewishlist(course.course_id, course.instructor_id, course.wishlist_id)}
                    className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
