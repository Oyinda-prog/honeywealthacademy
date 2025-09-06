// app/create-meeting/page.tsx or any component

'use client';

import React, { useState } from 'react';

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

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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
    
    console.log(data.start_url);
    console.log(data.password);
    
    
    setMeetingLink(data.start_url || 'No link generated');
    setstudentMeetingLink(data.join_url || 'No link generated');
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Create Zoom Meeting</h2>

      <input
        className="border p-2 w-full mb-2"
        name="topic"
        placeholder="Meeting Topic"
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-2"
        name="start_time"
        placeholder="Start Time (YYYY-MM-DDTHH:MM:SSZ)"
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-2"
        type="number"
        name="duration"
        placeholder="Duration in minutes"
        onChange={handleChange}
        value={formData.duration}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={createMeeting}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Meeting'}
      </button>

       {meetingLink && (
        <div className="mt-4">
          <strong>Join Link:</strong><br />
          <a href={meetingLink} className="text-blue-500 underline" target="_blank">
            {meetingLink}
          </a>
        </div>
      )} 
      {studentmeetingLink && (
        <div className="mt-4">
          <strong>Student Join Link:</strong><br />
          <a href={studentmeetingLink} className="text-blue-500 underline" target="_blank">
            {studentmeetingLink}
          </a>
        </div>
      )} 
    </div>
  );
}

