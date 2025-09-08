'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Page = () => {
  const [amount, setamount] = useState('');
  const [bankname, setbankname] = useState('');
  const [accountnumber, setaccountnumber] = useState('');
  const [holdername, setholdername] = useState('');
  const route = useRouter();
  const [id, setid] = useState('');
  const [balance, setbalance] = useState('');
  const [pin, setpin] = useState<number>(0);
  const [userpin, setuserpin] = useState<number>(0);
  const [msg, setmsg] = useState('');
  const transactionid =
    Math.round(Math.random() * 2456789000000000) +
    'wd' +
    Math.round(Math.random() * 2456789000000000);

  useEffect(() => {
    const getuser = async () => {
      const stdid = localStorage.getItem('studentid');
      if (stdid) {
        const id = JSON.parse(stdid);
        const res = await fetch(
          'http://localhost/nextjsbackendproject/accountstudent.php',
          {
            method: 'POST',
            body: JSON.stringify({ studentid: id }),
          }
        );
        const data = await res.json();
        console.log(data);
        
        if (data.status) {
          setid(stdid);
          setbalance(data.balance);
          setuserpin(data.transactionpin);
        } 
        
      }
      else {
          route.push('/student_login');
        }
    };
    getuser();
  }, []);
useEffect(() => {
  console.log(id);
  console.log(balance);
  
  console.log(userpin);
  
}, [userpin,id,balance])

  const values = { amount, bankname, accountnumber, holdername, transactionid, id };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
if(bankname===''||accountnumber===''||holdername===''||amount===''  ){
 setmsg('All fields are required');
}
else if(accountnumber.length<10 || accountnumber.length>10){
setmsg('Enter valid account number');
}
    else if (amount > balance) {
      setmsg('Insufficient funds');
    }
     else if (String(pin).length !== 4) {
      setmsg('Enter 4 digits pin');
    } else if (userpin === 0) {
      setmsg('Transaction pin is yet to be set');
    } else if (userpin !== pin) {
      setmsg('Enter your 4-digits transaction pin');
    } else {
      const res = await fetch('http://localhost/nextjsbackendproject/withdraw.php', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.status===200) {
        setmsg(data.msg);
        setTimeout(() => {
          route.push('/account');
        }, 5000);
      } else {
        setmsg(data.msg);
      }
    }
    setTimeout(() => {
      setmsg('');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#0A1F44]">
       
<div className="mb-6 flex justify-between items-center">
  <h1 className="text-2xl font-bold text-[#0A1F44]">Cash Withdrawal</h1>
  <Link
    href="/account"
    className="bg-[#0A1F44] text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition"
  >
    Dashboard
  </Link>
</div>


       
        <div className="mb-6 p-4 bg-[#0A1F44] text-white rounded-lg shadow-inner text-center">
          <p className="text-sm">Available Balance</p>
          <p className="text-2xl font-bold mt-1">#{balance}</p>
        </div>

       
        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Recipient Account Number
            </label>
            <input
              type="number"
      
              onChange={(e) => setaccountnumber(e.target.value)}
              placeholder="10-digit account number"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Recipient Bank Name
            </label>
            <input
              type="text"
              onChange={(e) => setbankname(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Account Holder&apos;s Name
            </label>
            <input
              type="text"
              onChange={(e) => setholdername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Amount</label>
            <input
              type="number"
              onChange={(e) => setamount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Transaction Pin
            </label>
            <input
              type="number"
              onChange={(e) => setpin(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0A1F44] text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-900 transition"
          >
            Withdraw
          </button>
        </form>

        {msg && (
          <div className="mt-4 text-center text-red-500 font-medium">{msg}</div>
        )}
      </div>
    </div>
  );
};

export default Page;
