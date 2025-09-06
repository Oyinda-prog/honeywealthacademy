"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const route = useRouter();
  const [msg, setmsg] = useState("");
  const [viewedcourse, setviewedcourse] = useState<Course>();
  const [price, setprice] = useState<number>(0);
  const [carts, setcarts] = useState<Course[]>([]);

  useEffect(() => {
    const course = localStorage.getItem("viewedcourse") || undefined;
    if (course !== undefined) {
      const viewedcourse = JSON.parse(course);
      setviewedcourse(viewedcourse);
    }
  }, []);

  useEffect(() => {
    const getcart = async () => {
      const stdid = localStorage.getItem("studentid");
      if (stdid) {
        const id = JSON.parse(stdid);
        const response = await fetch(
          "http://localhost/nextjsbackendproject/cart.php",
          {
            method: "POST",
            body: JSON.stringify({ studentid: id }),
          }
        );
        const data = await response.json();

        if (data.status) {
          setcarts(data.carts);

          const gettotal = async () => {
            const response = await fetch(
              "http://localhost/nextjsbackendproject/sumprice.php",
              {
                method: "POST",
                body: JSON.stringify({ studentid: id }),
              }
            );
            const data = await response.json();
            if (data.status) {
              setprice(data.price);
            }
          };
          gettotal();
        }
      } else {
        route.push("/student_login");
      }
    };
    getcart();
  }, [viewedcourse, route]);

  const deletecart = async (cartid: number) => {
    const del = confirm("Are you sure you want to remove this item?");
    if (del) {
      const response = await fetch(
        "http://localhost/nextjsbackendproject/deletecart.php",
        {
          method: "POST",
          body: JSON.stringify({ cartid: cartid }),
        }
      );
      const data = await response.json();
      if (data.status) {
        const stdid = localStorage.getItem("studentid");
        if (stdid) {
          const id = JSON.parse(stdid);
          const response = await fetch(
            "http://localhost/nextjsbackendproject/cart.php",
            {
              method: "POST",
              body: JSON.stringify({ studentid: id }),
            }
          );
          const data = await response.json();
          if (data.status) {
            setcarts(data.carts);
          }

          const res = await fetch(
            "http://localhost/nextjsbackendproject/sumprice.php",
            {
              method: "POST",
              body: JSON.stringify({ studentid: id }),
            }
          );
          const dat = await res.json();
          if (dat.status) {
            setprice(data.price);
          }
        }
      } else {
        setmsg(data.msg);
      }
      setTimeout(() => {
        setmsg("");
      }, 3000);
    }
  };

  return (
    <>
      <Navbar />
      {msg && (
        <div className="max-w-3xl mx-auto mt-6 bg-red-100 text-red-800 px-4 py-3 rounded-md text-center font-medium shadow-sm">
          {msg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-12 mt-16">
        {carts.map((course, index) => (
          <div
            key={index}
            className="flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            <Image
              src={`http://localhost/nextjsbackendproject/images/${course.imagecover}`}
              unoptimized
              width={400}
              height={200}
              alt="course cover"
              className="object-cover w-full h-48 rounded-t-lg"
            />
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {course.course_title}
                </h2>
                <p className="text-sm text-gray-500">{course.category}</p>
                <p className="mt-1 text-sm text-gray-600">
                  Level: {course.level}
                </p>
                <p className="text-sm text-gray-600">
                  Language: {course.language}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-bold text-blue-900">
                  ₦{course.price}
                </span>
                <button
                  onClick={() => deletecart(course.cart_id)}
                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md shadow hover:bg-red-700 active:bg-red-800 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto p-6 mt-10">
        {carts.length < 1 ? (
          <div className="text-center mt-10">
  <p className="text-gray-600 text-lg font-medium">
    No courses in your cart yet.
  </p>
  <Link
    href="/"
    className="inline-block mt-3 px-5 py-2 bg-blue-900 text-white rounded-lg shadow-md hover:bg-blue-800 transition"
  >
    Browse Courses
  </Link>
</div>

        ) : (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-lg font-semibold text-gray-800">
              Total: <span className="text-blue-900">₦{price}</span>
            </p>
            <Link
              href="/cart/checkout"
              className="bg-blue-900 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-800 transition shadow"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
