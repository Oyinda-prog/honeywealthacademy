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
  const [id, setid] = useState(undefined);
  // const [lastname, setlastname] = useState('')
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
      // console.log(firstname);
      setcurrentstudent(currentstd);
    }
  }, []);
  useEffect(() => {
    // console.log(id);
    console.log(currentstudent);
  }, [id, currentstudent]);

  

  return (
    <>
      <Navbar />
  
      <div className="grid lg:grid-cols-4 p-5 gap-5">
        {allcourses.map((course, index) => (
          <div
            key={index}
            className="flex flex-col p-5 rounded-lg shadow-lg items-center space-y-4"
          >
            {/* <h1 key={index}>{course.admin_verification}</h1> */}
            <Image
              src={`http://localhost/nextjsbackendproject/images/${course.course_imagecover}`}
              unoptimized
              width={100}
              height={10}
              alt="image"
              className="object-cover w-full h-auto"
            ></Image>
            <p>{course.category}</p>
            <p>{course.level}</p>
            <p>{course.Language}</p>
            <p>#{course.course_price}</p>
            <p>
              <Link href={`${course.course_code}`}>View Course</Link>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
