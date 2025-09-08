'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

interface Currentstudent {
  lastname: string,
  onboarding: number,
  referralcode: string,
  student_id: number
}

const Navbar = () => {
  const route = useRouter()
  // const [id, setid] = useState<number | undefined>(undefined)
  const [isOpen, setIsOpen] = useState(false)
  const [cartlength, setcartlength] = useState(0)
  const [currentstudent, setcurrentstudent] = useState<Currentstudent>({
    lastname: '',
    onboarding: 0,
    referralcode: '',
    student_id: 0
  })
const [id, setid] = useState('')
const stdidStr = localStorage.getItem("studentid");
const instructorid=localStorage.getItem("instructorid")
const currentinstructor=JSON.parse(localStorage.getItem('currentinstructor')!)
  useEffect(() => {
    const getcart = async () => {
        if(stdidStr){
       setid(stdidStr)
       try {
         const response = await fetch(
           "http://localhost/nextjsbackendproject/cart.php",
           {
             method: "POST",
             body: JSON.stringify({ studentid: stdidStr }),
           }
         );
         const data = await response.json();

 
         if (data.status) {
          console.log(data);
          
           setcartlength(data.carts.length);
         }
       } catch (err) {
         console.error(err);
       }
        }

    };
    getcart();
  }, [route]);

  useEffect(() => {
   
    const currentstudent = localStorage.getItem("currentstudent");
    if (currentstudent) {
      const currentstd = JSON.parse(currentstudent)
      setcurrentstudent(currentstd)
    }
  }, [cartlength])
  const logout=()=>{
    localStorage.removeItem('instructorid')
    route.push('/')
  }

  return (
    <>
      <nav className="bg-[#0A1F44] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-9xl mx-auto flex justify-between items-center px-2 py-2">
          <Link href="/" className="text-lg font-bold">
          
              <Image
                src="/images/honeywealthcon.png"
                alt="profilepicture"
                height={80}
                width={155}
                className="rounded-3xl border-4 border-blue-900 object-cover"
              />
            
          </Link>

          <div className="hidden md:flex items-center gap-6 text-base font-medium">
            <Link href="/" className="hover:text-gray-200 transition">Home</Link>
            <Link href="instructor_signup" className="hover:text-gray-200 transition">Instructor Sign Up</Link>
            <Link href="instructor_login" className="hover:text-gray-200 transition">Instructor Login</Link>
            <Link href="signup" className="hover:text-gray-200 transition">Student Sign Up</Link>
            <Link href="student_login" className="hover:text-gray-200 transition">Student Login</Link>

            {id ? (
              <span className="italic font-semibold">{currentstudent.lastname}</span>
            ) : (
              <p></p>
              // <Link href="" className="hover:text-gray-200 transition">Other Info</Link>
            )}

            
{instructorid ? (
              <span className="italic font-semibold">{currentinstructor.lastname}</span>
            ) : (
              <p></p>
              
            )}
                      
{instructorid ? (
              <Link href="/app_center" className="hover:text-gray-200 transition">Account</Link>
            ) : (
              <p></p>
          
            )}
            {instructorid ? (
              <button  className="hover:text-gray-200 transition" onClick={logout}>Logout</button>
            ) : (
              <p></p>
          
            )}

            {id && (
              <>
            
                <Link href="/cart" className="hover:text-gray-200 transition relative flex items-center">
                  Cart
                  {id && cartlength > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartlength}
                    </span>
                  )}
                </Link>
                <Link href="/account" className="hover:text-gray-200 transition">Account</Link>
              </>
            )}
          </div>

          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

       
        {isOpen && (
          <div className="md:hidden flex flex-col items-start gap-4 px-8 py-4 bg-blue-900 text-base font-medium">
            <Link href="/" className="hover:text-gray-200 transition">Home</Link>
            <Link href="instructor_signup" className="hover:text-gray-200 transition">Instructor Sign Up</Link>
            <Link href="instructor_login" className="hover:text-gray-200 transition">Instructor Login</Link>
            <Link href="signup" className="hover:text-gray-200 transition">Student Sign Up</Link>
            <Link href="student_login" className="hover:text-gray-200 transition">Student Login</Link>

            {currentstudent.lastname !== '' ? (
              <span className="italic font-semibold">{currentstudent.lastname}</span>
            ) : (
              <Link href="" className="hover:text-gray-200 transition">Other Info</Link>
            )}

            {currentstudent.lastname !== '' && (
              <>
               
                <Link href="/cart" className="hover:text-gray-200 transition relative flex items-center">
                  Cart
                  {cartlength > 0 && currentstudent && (
                    <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartlength}
                    </span>
                  )}
                </Link>
                <Link href="/account" className="hover:text-gray-200 transition">Account</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
