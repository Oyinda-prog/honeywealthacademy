"use client";
import Navbar from "@/components/Navbar";
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
  course_video: string;
  course_imagecover: string;
  admin_verification: number | string;
  category: string;
}

interface Currentstudent {
  lastname: string;
  onboarding: number;
  referralcode: string;
  student_id: number;
}

const Page = () => {
  const [allcourses, setallcourses] = useState<Course[]>([]);
  const [msg, setmsg] = useState("");

  useEffect(() => {
    const getcourses = async () => {
      const response = await fetch(
        "http://localhost/nextjsbackendproject/displaycourses.php",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setallcourses(data.allcourses);
      console.log(data);
    };
    getcourses();
  }, []);

  const [id, setid] = useState<number | undefined>(undefined);
  const [currentstudent, setcurrentstudent] = useState<Currentstudent>({
    lastname: "",
    onboarding: 0,
    referralcode: "",
    student_id: 0,
  });

  useEffect(() => {
    const id = localStorage.getItem("studentid");
    if (id) {
      const student_id = JSON.parse(id);
      console.log(student_id);
      setid(student_id);
    }
    const currentstudent = localStorage.getItem("currentstudent");
    if (currentstudent) {
      const currentstd = JSON.parse(currentstudent);
      setcurrentstudent(currentstd);
    }
  }, []);

  useEffect(() => {
    console.log(currentstudent);
  }, [id, currentstudent]);

  const addwishlist = async (courseid: number, instructorid: number) => {
    if (id && courseid && instructorid) {
      const response = await fetch(
        "http://localhost/nextjsbackendproject/wishlistadd.php",
        {
          method: "POST",
          body: JSON.stringify({ id, courseid, instructorid }),
        }
      );
      const data = await response.json();
      setmsg(data.msg);
    }
    setTimeout(() => {
      setmsg("");
    }, 3000);
  };

  return (
    <>
      <Navbar />
      

     
<div className="bg-gradient-to-b from-[#0A1F44] to-white text-white py-20 px-6 text-center">
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
    Learn and Earn Anytime, Anywhere
  </h1>
  <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
  Advance your career with courses taught by top professionals. Invite friends to learn with you and earn when they enroll.
  </p>
  <Link
    href="/"
    className="mt-6 inline-block bg-white text-[#0A1F44] px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
  >
    Start Learning
  </Link>
</div>


     
      <div className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-[#0A1F44] mb-6 text-center">
          Browse Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {["Development", "Business", "Design", "Marketing", "IT & Software", "Music", "Photography", "Finance"].map(
            (cat, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-lg shadow hover:shadow-md transition p-6 text-center font-medium cursor-pointer"
              >
                {cat}
              </div>
            )
          )}
        </div>
      </div>

      
   {
    msg?     <p className="mx-auto mt-4 w-fit px-4 py-2 text-center text-green-700 bg-green-100 border border-green-300 rounded-lg font-medium shadow-sm">
  {msg}
</p>:null
   }

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-50">
        {allcourses.map((course, index) => (
          <div
            key={index}
            className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition p-4"
          >
            <Image
              src={`http://localhost/nextjsbackendproject/images/${course.course_imagecover}`}
              unoptimized
              width={400}
              height={250}
              alt="course cover"
              className="rounded-lg object-cover w-full h-48 sm:h-40"
            />
            <div className="mt-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-[#0A1F44] line-clamp-2">
                {course.course_title}
              </h2>
              <p className="text-sm text-gray-500">{course.category}</p>
              <p className="text-sm text-gray-500">
                {course.level} • {course.Language}
              </p>
              <p className="text-xl font-bold text-[#0A1F44] mt-2">
                ₦{course.course_price}
              </p>
              <div className="mt-auto flex flex-wrap justify-between items-center gap-2 pt-3">
                <Link
                  href={`${course.course_id}`}
                  className="bg-[#0A1F44] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0d2a61] transition w-full sm:w-auto text-center"
                >
                  View Course
                </Link>
                <button
                  onClick={() =>
                    addwishlist(course.course_id, course.instructor_id)
                  }
                  className="bg-gray-200 text-[#0A1F44] px-3 py-2 rounded-lg text-sm hover:bg-gray-300 transition w-full sm:w-auto"
                >
                  + Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="bg-[#0A1F44] text-white py-12 text-center px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Join Honeywealth Academy Today
        </h2>
        <p className="text-gray-200 max-w-xl mx-auto mb-6">
          Start your learning journey with thousands of students worldwide. Sign
          up and unlock all features now.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/signup"
            className="bg-white text-[#0A1F44] px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            Log In
          </Link>
        </div>
      </div>

     
      <footer className="bg-gray-100 text-center py-8 text-sm text-gray-600 mt-8">
        <p>© {new Date().getFullYear()} Honeywealth Academy. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link href="/about" className="hover:text-[#0A1F44]">About</Link>
          <Link href="/contact" className="hover:text-[#0A1F44]">Contact</Link>
          <Link href="/privacy" className="hover:text-[#0A1F44]">Privacy Policy</Link>
        </div>
      </footer>
    </>
  );
};

export default Page;
