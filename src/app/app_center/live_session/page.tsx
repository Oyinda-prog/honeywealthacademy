'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateMeeting() {
  const [loading, setLoading] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [studentmeetingLink, setstudentMeetingLink] = useState('');
  const [formData, setFormData] = useState({
    topic: '',
    start_time: '',
    duration: 30,
    email: 'honeywealthacademy1@gmail.com',
  });
  const route=useRouter()
  useEffect(() => {
    const id = localStorage.getItem("instructorid");
    if (!id) {
      route.push('/')
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createMeeting = async () => {
    setLoading(true);

    const res = await fetch('http://localhost/nextjsbackendproject/zoom.php', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);

    setMeetingLink(data.start_url || 'No link generated');
    setstudentMeetingLink(data.join_url || 'No link generated');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-white flex flex-col items-center p-6">
    
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Zoom Meeting</h2>

        <input
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="topic"
          placeholder="Meeting Topic"
          onChange={handleChange}
        />

        <input
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="start_time"
          placeholder="Start Time (YYYY-MM-DDTHH:MM:SSZ)"
          onChange={handleChange}
        />

        <input
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          name="duration"
          placeholder="Duration in minutes"
          onChange={handleChange}
          value={formData.duration}
        />

        <button
          className="bg-[#0A1F44] text-white font-semibold w-full py-3 rounded-lg hover:bg-blue-900 transition disabled:opacity-50"
          onClick={createMeeting}
          disabled={loading}
        >
          
          {loading ? 'Creating...' : 'Create Meeting'}
        </button>
        <div className='mt-9 p-3'>
        <Link
          href="/app_center"
          className="bg-gray-800 mt-5 p-2 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          Go back to Dashboard
        </Link>
        </div>
        <div className="w-full max-w-md mb-6 flex justify-end">
      </div>
        {meetingLink && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="font-medium text-gray-700 mb-1">Join Link:</p>
            <a href={meetingLink} className="text-blue-600 underline break-all" target="_blank">
              {meetingLink}
            </a>
          </div>
        )}

        {studentmeetingLink && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="font-medium text-gray-700 mb-1">Student Join Link:</p>
            <a href={studentmeetingLink} className="text-blue-600 underline break-all" target="_blank">
              {studentmeetingLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
