'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect,useState } from 'react'

const Page = () => {
  const [balance, setbalance] = useState(0)
  const [profilepicture, setprofilepicture] = useState('')
  const [gender, setgender] = useState('')
  const route=useRouter()
  const userid = localStorage.getItem("studentid");

   useEffect(() => {
      const stdidStr = localStorage.getItem("studentid");
      console.log(stdidStr);
      
        if (!stdidStr) {
          route.push("/student_login");
        }
    }, [])

 const logoutuser = () => {
    const id = localStorage.getItem('studentid')
    if (id) {
      localStorage.removeItem('studentid')
       route.push('/student_login')
    }
   
  }
  useEffect(() => {
    const id=localStorage.getItem('invitercode')
    if(id){
      const invitercode=JSON.parse(id)
      const getall=async()=>{
        const res=await fetch('http://localhost/nextjsbackendproject/account.php',{
          method:'POST',
          body:JSON.stringify({invitercode})
        })
        const data=await res.json()

        if(data){
          const stdid = localStorage.getItem("studentid");
          if (stdid) {
            const id = JSON.parse(stdid);
            const res=await fetch('http://localhost/nextjsbackendproject/accountstudent.php',{
              method:'POST',
              body:JSON.stringify({studentid:id})
            })
            const data=await res.json() 
            if(data.status===200){
              setbalance(data.balance)
              setgender(data.gender)
              setprofilepicture(data.profilepicture)
            }
            else if(data.balance===null){
              setbalance(0)
            }
          }
        }
      }
      getall();
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      
      <aside className="w-full md:w-64 bg-white shadow-md border-r p-6 space-y-6">
        <div className="flex flex-col items-center">
          {profilepicture !== null && (
            <Link href="/account/view_personalinformation">
              <Image
                src={`http://localhost/nextjsbackendproject/profilepictures/${profilepicture}`}
                alt="profilepicture"
                height={100}
                width={100}
                unoptimized
                className="rounded-full border-4 border-blue-900 object-cover"
              />
            </Link>
          )}
          {profilepicture === null && gender === 'Female' && (
            <Link href="/account/view_personalinformation">
              <Image
                src="/images/defaultprofilepicture.jpg"
                alt="profilepicture"
                height={100}
                width={100}
                className="rounded-full border-4 border-blue-900 object-cover"
              />
            </Link>
          )}
          {profilepicture === null && gender === 'Male' && (
            <Link href="/account/personal">
              <Image
                src="/images/defaultprofilepicturemale.jpg"
                alt="profilepicture"
                height={100}
                width={100}
                className="rounded-full border-4 border-blue-900 object-cover"
              />
            </Link>
          )}
          <h2 className="mt-4 font-semibold text-gray-800 text-lg">My Account</h2>
          <p className="text-sm text-gray-500">Manage your learning & profile</p>
        </div>

        <nav className="space-y-3">
          <Link href="/account/settings" className="block text-gray-700 hover:text-blue-900">⚙️ Settings</Link>
          <Link href="/account/enrolled_courses" className="block text-gray-700 hover:text-blue-900">📚 Enrolled Courses</Link>
          <Link href="/account/wishlist" className="block text-gray-700 hover:text-blue-900">❤️ Wishlist</Link>
          <Link href="/account/certificates" className="block text-gray-700 hover:text-blue-900">🎓 Certificates</Link>
          <Link href="/account/personal" className="block text-gray-700 hover:text-blue-900">👤 Personal</Link>
          <Link href="/account/purchase_receipts" className="block text-gray-700 hover:text-blue-900">🧾 Purchase Receipts</Link>
          <Link href={`onboarding/onboardingtrue=${userid}`} className="block text-gray-700 hover:text-blue-900">📝 Referral Code</Link>
          <Link href="/cart" className="block text-gray-700 hover:text-blue-900">🛒 View Cart</Link>
          <Link href="/" className="block text-gray-700 hover:text-blue-900">🏠 Home</Link>
 <button
                  onClick={logoutuser}
                  className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full text-left"
                >
                  Logout
                </button>
        </nav>
      </aside>

    
      <main className="flex-1 p-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome to your student account.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Wallet Balance</h2>
            <p className="text-3xl font-bold mt-2">#{balance}</p>
            <Link href="/account/withdrawal" className="inline-block mt-4 bg-white text-blue-900 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100">Withdraw</Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-lg font-semibold text-gray-800">Learning Progress</h2>
            <p className="text-gray-600 mt-2">Keep track of your enrolled courses and achievements.</p>
            <Link href="/account/enrolled_courses" className="inline-block mt-4 bg-blue-900 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-800">View Courses</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page
