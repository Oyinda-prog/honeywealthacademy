'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

interface Currentstudent {
  lastname: string,
  onboarding: number,
  referralcode: string,
  student_id: number
}

const Navbar = () => {
  const route = useRouter()
  const [id, setid] = useState(undefined)
  const [isOpen, setIsOpen] = useState(false)
  const [currentstudent, setcurrentstudent] = useState<Currentstudent>({
    lastname: '',
    onboarding: 0,
    referralcode: '',
    student_id: 0
  })

  useEffect(() => {
    const id = localStorage.getItem('studentid')
    if (id) {
      const student_id = JSON.parse(id)
      console.log(student_id)
      setid(student_id)
    }
    const currentstudent = localStorage.getItem("currentstudent");
    if (currentstudent) {
      const currentstd = JSON.parse(currentstudent)
      setcurrentstudent(currentstd)
    }
  }, [])

  useEffect(() => {
    console.log(currentstudent);
  }, [id, currentstudent])

  const logoutuser = () => {
    const id = localStorage.getItem('currentuser')
    if (id) {
      localStorage.removeItem('currentuser')
      route.push('/student_login')
    }
  }

  return (
    <>
      <nav className="bg-[#0A1F44] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          
          
          <Link href="/" className="text-lg font-bold">Honeywealth Academy</Link>

        
          <div className="hidden md:flex items-center gap-6 text-base font-medium">
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
                <button
                  onClick={logoutuser}
                  className="bg-white text-blue-900 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  Logout
                </button>
                <Link href="/cart" className="hover:text-gray-200 transition">Cart</Link>
                <Link href="/account" className="hover:text-gray-200 transition">Account</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
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
                <button
                  onClick={logoutuser}
                  className="bg-white text-blue-900 px-4 py-2 rounded-md hover:bg-gray-100 transition w-full text-left"
                >
                  Logout
                </button>
                <Link href="/cart" className="hover:text-gray-200 transition">Cart</Link>
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
