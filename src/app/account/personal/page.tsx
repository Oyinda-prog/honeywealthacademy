'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Student {
  email: string;
  firstname: string;
  lastname: string;
  balance: number;
  gender: string; 
  educationlevel: string;
  transactionpin: number;
  referralcode: string;
  onboarding: number;
  student_id: '';
}

const Page = () => {
  const route = useRouter();
  const [profilepicture, setprofilepicture] = useState<File | null>(null);
  const [msg, setmsg] = useState('');
  const [student, setstudent] = useState<Student>({
    balance: 0,
    email: '',
    gender: '', 
    educationlevel: '',
    transactionpin: 0,
    referralcode: '',
    onboarding: 0,
    firstname: '',
    lastname: '',
    student_id: ''
  });

  useEffect(() => {
    const stdid = localStorage.getItem("studentid");
    if(stdid){
      const getstudent = async () => {
        const res = await fetch('http://localhost/nextjsbackendproject/accountstudent.php', {
          method: 'POST',
          body: JSON.stringify({ studentid: stdid })
        });
        const data = await res.json();
        if(data.status === 200) setstudent(data.user);
      };
      getstudent();
    } else {
      route.push('/student_login');
    }
  }, []);

  const changefirstname = async () => {
    const res = await fetch('http://localhost/nextjsbackendproject/firstnameupdate.php', {
      method:'POST',
      body:JSON.stringify({studentid:student.student_id, firstname:student.firstname})
    });
    const data = await res.json();
    setmsg(data.msg);
    setTimeout(() => setmsg(''), 3000);
  };

  const changelastname = async () => {
    const res = await fetch('http://localhost/nextjsbackendproject/lastnameupdate.php', {
      method:'POST',
      body:JSON.stringify({studentid:student.student_id, lastname:student.lastname})
    });
    const data = await res.json();
    setmsg(data.msg);
    setTimeout(() => setmsg(''), 3000);
  };

  const changeemail = async () => {
    const res = await fetch('http://localhost/nextjsbackendproject/emailupdate.php', {
      method:'POST',
      body:JSON.stringify({studentid:student.student_id, email:student.email})
    });
    const data = await res.json();
    setmsg(data.msg);
    setTimeout(() => setmsg(''), 3000);
  };

  const changetransactionpin = async () => {
    if(student.transactionpin.toString().length !== 4){
      setmsg('It must be a 4-digit pin');
    } else {
      const res = await fetch('http://localhost/nextjsbackendproject/transactionpinupdate.php', {
        method:'POST',
        body:JSON.stringify({studentid:student.student_id, transactionpin:student.transactionpin})
      });
      const data = await res.json();
      setmsg(data.msg);
    }
    setTimeout(() => setmsg(''), 3000);
  };

  const uploadpicture = async () => {
    if(!profilepicture){ setmsg('No file selected'); return; }
    const formdata = new FormData();
    formdata.append('profilepicture', profilepicture);
    formdata.append('studentid', student.student_id);
    const res = await fetch('http://localhost/nextjsbackendproject/profilepictureupload.php', {
      method: 'POST',
      body: formdata
    });
    const data = await res.json();
    setmsg(data.msg);
    setTimeout(() => setmsg(''), 3000);
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gradient-to-b from-[#0A1F44] to-white">
  
      <aside className="w-full sm:w-64 bg-white border-r p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-6 text-[#0A1F44]">My Learning</h2>
        <nav className="space-y-4">
          <Link href="/" className="block text-gray-700 hover:text-[#0A1F44]">🏠 Home</Link>
          <Link href="/account/wishlist" className="block text-gray-700 hover:text-[#0A1F44]">❤️ Wishlist</Link>
          <Link href="/cart" className="block text-gray-700 hover:text-[#0A1F44]">🛒 Cart</Link>
          <Link href="/account/personal" className="block text-gray-700 hover:text-[#0A1F44]">👤 Personal</Link>
        </nav>
      </aside>

   
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-[#0A1F44]">Student Profile</h1>


        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-2xl space-y-6">
        {msg && <p className="text-center text-[#0A1F44] font-medium mb-4">{msg}</p>}
          
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-gradient-to-tr from-[#0A1F44] to-[#0A1F44]">
              {profilepicture ? (
                <Image src={URL.createObjectURL(profilepicture)}  width={300} height={300}  alt="Profile" className="w-full h-full object-cover"/>
              ) : (
                <Image src={`/default-profile.png`} alt="Profile"  width={300} height={300} className="w-full h-full object-cover"/>
              )}
            </div>
            <input type="file" onChange={(e) => { if(e.target.files) setprofilepicture(e.target.files[0]) }} className="text-sm"/>
            <button onClick={uploadpicture} className="px-4 py-2 bg-[#0A1F44] text-white rounded hover:bg-[#061535] text-sm">Update Profile Picture</button>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Firstname</label>
              <input type="text" value={student.firstname} onChange={(e)=>setstudent({...student,firstname:e.target.value})} className="border rounded p-2"/>
              <button onClick={changefirstname} className="mt-1 px-3 py-1 bg-[#0A1F44] text-white rounded hover:bg-[#061535] text-sm">Save</button>
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Lastname</label>
              <input type="text" value={student.lastname} onChange={(e)=>setstudent({...student,lastname:e.target.value})} className="border rounded p-2"/>
              <button onClick={changelastname} className="mt-1 px-3 py-1 bg-[#0A1F44] text-white rounded hover:bg-[#061535] text-sm">Save</button>
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Email</label>
              <input type="email" value={student.email} onChange={(e)=>setstudent({...student,email:e.target.value})} className="border rounded p-2"/>
              <button onClick={changeemail} className="mt-1 px-3 py-1 bg-[#0A1F44] text-white rounded hover:bg-[#061535] text-sm">Save</button>
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Transaction Pin</label>
              <input type="text" value={student.transactionpin} onChange={(e)=>setstudent({...student,transactionpin:parseInt(e.target.value)||0})} className="border rounded p-2"/>
              <button onClick={changetransactionpin} className="mt-1 px-3 py-1 bg-[#0A1F44] text-white rounded hover:bg-[#061535] text-sm">Save</button>
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Gender</label>
              <input type="text" value={student.gender} disabled className="border rounded p-2 bg-gray-100"/>
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Education Level</label>
              <input type="text" value={student.educationlevel} disabled className="border rounded p-2 bg-gray-100"/>
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Referral Code</label>
              <input type="text" value={student.referralcode} disabled className="border rounded p-2 bg-gray-100"/>
            </div>
          </div>

          
          <div className="mt-4">
            {student.onboarding === 1 ? (
              <p className="text-green-600 font-medium">You have been fully onboarded ✅</p>
            ) : (
              <p className="text-red-600 font-medium">You have not been onboarded. Kindly continue with your onboarding ⏳</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
