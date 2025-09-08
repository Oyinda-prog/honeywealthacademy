"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormikValues {
  code: string;
  title: string;
  description: string;
  level: string;
  language: string;
  accesstype: string;
  material: File | null;
  category: string;
  price: number;
}

const Page = () => {
  const [instructorid, setInstructorid] = useState("");
  const [msg, setmsg] = useState("");
const route=useRouter()
  useEffect(() => {
    const id = localStorage.getItem("instructorid");
    if (!id) {
      route.push('/')
    }
  }, []);
  useEffect(() => {
    const id = localStorage.getItem("instructorid");
    if (id) {
      const parsedId = JSON.parse(id);
      setInstructorid(parsedId);
    }
  }, []);


  const [video, setVideo] = useState<File | null>(null);
  const [material, setMaterial] = useState<File | null>(null);
  const [imageCover, setImageCover] = useState<File | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  };

  const formik = useFormik<FormikValues>({
    initialValues: {
      code: "",
      title: "",
      description: "",
      level: "",
      language: "",
      accesstype: "",
      material: null,
      category: "",
      price: 0,
    },
    validationSchema: Yup.object({
      code: Yup.string().required("This field is required"),
      title: Yup.string().required("This field is required"),
      price: Yup.number().required("This field is required"),
      description: Yup.string().required("This field is required"),
      category: Yup.string().required("This field is required"),
      language: Yup.string().required("This field is required"),
      level: Yup.string().required("This field is required"),
      accesstype: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values) => {
      if (!video || !material || !imageCover) {
        alert("Please upload all required files.");
        return;
      }

      const formData = new FormData();
      formData.append("video", video);
      formData.append("material", material);
      formData.append("imagecover", imageCover);
      formData.append("description", values.description);
      formData.append("instructorid", instructorid);
      formData.append("code", values.code);
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("level", values.level);
      formData.append("language", values.language);
      formData.append("accesstype", values.accesstype);
      formData.append("price", String(values.price));

      try {
        const response = await fetch(
          "http://localhost/nextjsbackendproject/courses.php",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        console.log(data);
        
        if (data.status == true) {
          setmsg(data.msg);
          setTimeout(() => {
            setmsg("");
          }, 3000);
        } else {
          setmsg(data.msg);
          setTimeout(() => {
            setmsg("");
          }, 3000);
        }
      } catch (err) {
        console.log("Error submitting form", err);
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#0A1F44]">
            Upload a New Course
          </h2>
          <p className="text-sm text-gray-500">
            Fill in the details below to create and publish your course.
          </p>
        </div>

      
        <Link
          href={`/app_center`}
          className="bg-[#0A1F44] text-white px-4 py-2 rounded-md hover:bg-[#0A1F44] transition"
        >
          Dashboard
        </Link>
      </div>

   
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="text"
          name="code"
          placeholder="Course Code"
          className="w-full p-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
          onChange={formik.handleChange}
        />
        <small className="text-red-500">{formik.errors.code}</small>

        <input
          type="text"
          name="title"
          placeholder="Course Title"
          className="w-full p-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
          onChange={formik.handleChange}
        />
        <small className="text-red-500">{formik.errors.title}</small>

        <input
          type="number"
          name="price"
          placeholder="Enter amount"
          className="w-full p-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
          onChange={formik.handleChange}
        />
        <small className="text-red-500">{formik.errors.price}</small>

        <textarea
          name="description"
          placeholder="Course Description"
          className="w-full p-2 border border-[#0A1F44] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
          onChange={formik.handleChange}
        ></textarea>
        <small className="text-red-500">{formik.errors.description}</small>

        <select
          name="category"
          className="w-full p-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
          onChange={formik.handleChange}
        >
          <option value="">Select Category</option>
          <option value="Technology & Programming">Technology & Programming</option>
          <option value="Business & Finance">Business & Finance</option>
          <option value="Health & Wellness">Health & Wellness</option>
          <option value="Science & Engineering">Science & Engineering</option>
          <option value="Marketing & Communication">Marketing & Communication</option>
          <option value="Design & Creativity">Design & Creativity</option>
          <option value="Personal Development">Personal Development</option>
          <option value="Music & Arts">Music & Arts</option>
          <option value="Education & Teaching">Education & Teaching</option>
          <option value="Language Learning">Language Learning</option>
          <option value="Legal & Law">Legal & Law</option>
          <option value="AI & Data Science">AI & Data Science</option>
          <option value="Cybersecurity">Cybersecurity</option>
        </select>
        <small className="text-red-500">{formik.errors.category}</small>

        <select
          name="language"
          className="w-full p-2 border border-[#0A1F44] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
          onChange={formik.handleChange}
        >
          <option value="">Choose Language</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
        <small className="text-red-500">{formik.errors.language}</small>

        <select
          name="level"
          className="w-full p-2 border border-[#0A1F44] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
          onChange={formik.handleChange}
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <small className="text-red-500">{formik.errors.level}</small>

        <select
          name="accesstype"
          className="w-full p-2 border border-[#0A1F44] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
          onChange={formik.handleChange}
        >
          <option value="">Select Access Type</option>
          <option value="Lifetime">Lifetime</option>
          <option value="Subscription-Based">Subscription-Based</option>
          <option value="Limited-Time Access">Limited-Time Access</option>
        </select>
        <small className="text-red-500">{formik.errors.accesstype}</small>

        <div>
          <label className="block text-sm font-medium text-[#0A1F44]">
            Upload Video
          </label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setVideo)}
            className="mt-1 block w-full text-sm text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0A1F44]">
            Upload Image Cover
          </label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setImageCover)}
            className="mt-1 block w-full text-sm text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0A1F44]">
            Upload Material
          </label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setMaterial)}
            className="mt-1 block w-full text-sm text-gray-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0A1F44] text-white py-2 px-4 rounded-md hover:bg-[#112B5C] transition"
        >
          Upload Course
        </button>
      </form>

      {msg && (
        <div className="mt-4 p-2 text-center text-white bg-amber-500 rounded-md">
          {msg}
        </div>
      )}
    </div>
  );
};

export default Page;
