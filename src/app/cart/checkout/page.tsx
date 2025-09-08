"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
//  interface payment {
//     admin_verify:null,
//     cart_id:number,
//     course_code:string
//     course_title:string
//     createdat:string,
//     instructor_id:number,
//     payment_id:number
//     payment_status:null
//     price:number,
//     receipt:string,
//     student_id:number
//  }
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
  cartstatus:number;
  trackingid:string;
  referenceid:string;
  couponcode:string;
}

const Page = () => {
  const route = useRouter();
  const [receipt, setreceipt] = useState<File | null>(null);
  const [carts, setcarts] = useState<Course[]>([]);
  const [msg, setmsg] = useState("");
  const [balance, setbalance] = useState<number>(0);
  const [studentid, setstudentid] = useState('')
  const [sum, setsum] = useState<number>(0);
  const [check, setcheck] = useState<boolean>(false);
  const [invitercode, setinvitercode] = useState("");
  
  // const [allpayments, setallpayments] = useState<payment[]>([])
        const alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        const number=[1,3,4,5,6,7,8,9,0,2]
          
          const first=alphabet[Math.floor(Math.random()*alphabet.length)]
          const second=alphabet[Math.floor(Math.random()*alphabet.length)]
          const third=alphabet[Math.floor(Math.random()*alphabet.length)]
          const fourth=Math.floor(Math.random()*10)
          const fifth=alphabet[Math.floor(Math.random()*alphabet.length)]
          const a=Math.round(Math.random()*number.length)
          const sixth=alphabet[Math.floor(Math.random()*alphabet.length)]
          const seventh=alphabet[Math.floor(Math.random()*alphabet.length)]
        const couponcode=first+second+third+a+fifth+sixth+fourth+a+seventh
        
        const trackingid=crypto.randomUUID()
        const referenceid=crypto.randomUUID()+a+third+sixth+fourth

  useEffect(() => {
    const code = localStorage.getItem("invitercode");
    if (code) {
      const inviter = JSON.parse(code);
      setinvitercode(inviter);
    }
  }, []);

  useEffect(() => {
    const getcart = async () => {
      const stdid = localStorage.getItem("studentid");
      if (stdid) {
        const id = JSON.parse(stdid);
        setstudentid(id);
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
          setcheck(true);

          const response2 = await fetch(
            "http://localhost/nextjsbackendproject/sumprice.php",
            {
              method: "POST",
              body: JSON.stringify({ studentid: id }),
            }
          );
          const getdata = await response2.json();
          if (getdata.status) {
            setsum(getdata.price);
          }

          const res = await fetch(
            "http://localhost/nextjsbackendproject/loggedinstudent.php",
            {
              method: "POST",
              body: JSON.stringify({ studentid: id }),
            }
          );
          const dat = await res.json();
          if (dat.status) {
            setbalance(dat.user.balance);
          }
        }
      }
    };
    getcart();
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    } 
  };

  const payment = () => {
    if (check) {
      if (balance >= sum && sum > 0) {
        const makepayment = async () => {
          const formdata=new FormData()
          formdata.append('studentid',studentid)
           formdata.append('sum',sum.toString())
          carts.forEach((cart) => {
          formdata.append("cart_ids[]", cart.cart_id.toString());
          formdata.append("course_ids[]", cart.course_id.toString());
          formdata.append("trackingids[]", trackingid);
          formdata.append("referenceids[]",referenceid);
          formdata.append("couponcodes[]", couponcode);
          formdata.append("cartstatus[]", '1');
           formdata.append("courseactivation[]", '1');
        });
        
          const response = await fetch(
            "http://localhost/nextjsbackendproject/checkoutbalance.php",
            {
              method: "POST",
              body: formdata,
            }
          );
          const data = await response.json();
          console.log(data);
          
          if (data.status === 200) {
            setmsg(data.msg);
            setTimeout(() => {
              route.push("/account");

            },
             4000);
          } else if (data.status === 201) {
            setmsg(data.msg);
          }
          setTimeout(() => setmsg(""), 3000);
        };
        makepayment();
      } 
      else {
        setmsg("Insufficient balance");
        setTimeout(() => setmsg(""), 3000);
      }
    }
  };

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!receipt) {
      alert("Please upload your payment receipt");
    } else {
      const stdid = localStorage.getItem("studentid");
      if (stdid) {
        const id = JSON.parse(stdid);
        const formdata = new FormData();
        formdata.append("receipt", receipt);
        formdata.append("studentid", id);
        formdata.append("invitercode", invitercode);
        carts.forEach((cart) => {
          formdata.append("cart_id[]", cart.cart_id.toString());
        });
        carts.forEach((cart) => {
          formdata.append("course_id[]", cart.course_id.toString());
        });
        const uploadreceipt = async () => {
          const response = await fetch(
            "http://localhost/nextjsbackendproject/payment.php",
            {
              method: "POST",
              body: formdata,
            }
          );
          const data = await response.json();
          if (data.status) {
            setmsg(data.msg);
            route.push("/account");
            setTimeout(() => {}, 3000);
          } else {
            setmsg(data.status);
          }
          setTimeout(() => setmsg(""), 3000);
        };
        uploadreceipt();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1F44] to-gray-900 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-4">Payment Options</h1>
      <p className="text-gray-300 mb-10 text-lg">
        Total Amount:{" "}
        <span className="font-semibold text-white text-xl">#{sum}</span>
      </p>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
       
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#0A1F44] mb-4">
              Bank Transfer
            </h2>
            <p className="text-gray-700">
              Bank Name: <span className="font-semibold">OPay</span>
            </p>
            <p className="text-gray-700">
              Account Number: <span className="font-semibold">8168837642</span>
            </p>
            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              <span className="font-medium">Note:</span> Kindly type the{" "}
              <span className="font-semibold">course code(s)</span> as the{" "}
              <span className="italic">payment description</span>.
            </p>
          </div>
          <form onSubmit={handlesubmit} className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Payment Receipt
            </label>
            <input
              type="file"
              required
              className="block w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#0A1F44] focus:outline-none"
              onChange={(e) => handleFileChange(e, setreceipt)}
            />
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-[#0A1F44] text-white font-semibold rounded-lg hover:bg-[#0A1F44]/90 transition shadow-md"
            >
              Submit Receipt
            </button>
          </form>
        </div>

        
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#0A1F44] mb-4">
              Pay with Balance
            </h2>
            <p className="text-gray-700">
              Available Balance:{" "}
              <span className="font-semibold">#{balance}</span>
            </p>
            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              Make instant payment using your available balance. Quick and
              secure.
            </p>
          </div>
          <button
            onClick={payment}
            className="mt-6 w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md"
          >
            Pay Instantly
          </button>
        </div>
      </div>

      {msg && (
        <p className="mt-8 text-center text-yellow-300 font-medium text-lg bg-yellow-900/20 px-4 py-2 rounded-lg">
          {msg}
        </p>
      )}

      <Link
        href="/account"
        className="mt-10 inline-block text-gray-300 hover:text-white underline text-sm"
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
};

export default Page;
