"use client";

import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";
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
    const course = localStorage.getItem("viewedcourse");
    console.log(course);

    if (course) {
      const viewedcourse = JSON.parse(course);
      console.log(viewedcourse);
      setviewedcourse(viewedcourse);
    } else {
      console.log(1234);
    }
  }, []);

  useEffect(() => {
    const getcart = async () => {
      const stdid = localStorage.getItem("studentid");
      console.log(stdid);

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
        console.log(data);
        
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
              console.log(data.price);

              setprice(data.price);
            } 
            else {
            }
            console.log(data);
          };
          gettotal();
        }
      } else {
        route.push("/student_login");
        // setmsg('No user found')
      }
    };
    getcart();
    console.log(viewedcourse);
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
        // console.log(stdid);

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
          console.log(dat);
          
          if (dat.status) {
            setprice(data.price);
          }

        }
      
      } 
      else {
        setmsg(data.msg);
      }
      setTimeout(() => {
        setmsg("");
      }, 3000);
      console.log(data);
    }
  };

  return (
    <>
      <p>{msg}</p>
      <div className="grid lg:grid-cols-4 p-5 gap-5">
        {carts.map((course, index) => (
          <div
            key={index}
            className="flex flex-col p-5 rounded-lg shadow-lg items-center space-y-4"
          >
            {/* <h1 key={index}>{course.admin_verification}</h1> */}
            <Image
              src={`http://localhost/nextjsbackendproject/images/${course.imagecover}`}
              unoptimized
              width={100}
              height={10}
              alt="image"
              className="object-cover w-full h-auto"
            ></Image>
            <p>{course.category}</p>
            <p>{course.level}</p>
            <p>{course.language}</p>
            <p>#{course.price}</p>
            <p>
              <button onClick={() => deletecart(course.cart_id)}>Remove</button>
            </p>
          </div>
        ))}
      </div>
      <div>
    {
      carts.length<1?(
        <p>No carts found yet</p>
      ):(
<div>
 <p> Total Balance:{price}</p>
<Link href='/cart/checkout'>Checkout</Link>
</div>
      )
    }
        
      </div>
    </>
  );
};

export default Page;
