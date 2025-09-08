'use client'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [pinone, setpinone] = useState<number>(0)
  const [pintwo, setpintwo] = useState<number>(0)
  const [studentid, setstudentid] = useState('')
  const [msg, setmsg] = useState('')
  const route = useRouter()

  useEffect(() => {
    const stdid = localStorage.getItem('studentid')
    if (stdid) {
      const id = JSON.parse(stdid)
      setstudentid(id)
    } else {
      route.push('/student_login')
    }
  }, [])

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (pinone === 0 || pintwo === 0) {
      setmsg('All fields are required')
    }
    else if (pinone !== pintwo) {
      setmsg('Enter the same digits')
    } 
   else if (String(pinone).length < 4 || String(pinone).length > 4) {
      setmsg('Enter 4 digits')
    } 
    else if (String(pintwo).length !== 4) {
      setmsg('Enter 4 digits')
    } 
    
    else {
      const res = await fetch(
        'http://localhost/nextjsbackendproject/transactionpin.php',
        {
          method: 'POST',
          body: JSON.stringify({ studentid, pinone }),
        }
      )
      const data = await res.json()
      if (data.status) {
        setmsg(data.msg)
      } else {
        setmsg(data.msg)
      }
    }
    setTimeout(() => {
      setmsg('')
    }, 3000);
  }

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0A1F44] to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-2">
          Set Transaction Pin
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          A 4-digit pin is required to make withdrawals and other transactions.
        </p>

        <form onSubmit={handlesubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Enter 4 digits"
            onChange={(e) => setpinone(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Confirm pin"
            onChange={(e) => setpintwo(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
          >
            Change Pin
          </button>
        </form>

        {msg && (
          <p className="mt-4 text-center text-sm font-medium text-red-600">
            {msg}
          </p>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/account"
            className="inline-block text-blue-900 font-semibold hover:underline"
          >
            Go back to account
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Page
