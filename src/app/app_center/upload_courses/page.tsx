"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

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
const [msg, setmsg] = useState("")

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
    onSubmit: async(values) => {
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

      console.log(formData);
      
      try {
        const response =await fetch("http://localhost/nextjsbackendproject/courses.php", {
          method: "POST",
          body: formData,
        });

       const data=await response.json()
       if(data.status==true){
setmsg(data.msg)
setTimeout(() => {
  setmsg('')  
}, 3000);
       }
       else{
setmsg(data.msg)
setTimeout(() => {
    setmsg('')
}, 3000);
       }
     
      } 
      catch (err) {
        console.log("Error submitting form", err);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="code"
          placeholder="Course Code"
          className="text-red-200 border border-amber-200"
          onChange={formik.handleChange}
        />
        <small className="text-red-400">{formik.errors.code}</small>

        <input
          type="text"
          name="title"
          placeholder="Course Title"
          className="text-red-200 border border-amber-200"
          onChange={formik.handleChange}
        />
        <small className="text-red-400">{formik.errors.title}</small>

        <input
          type="number"
          name="price"
          placeholder="Enter amount"
          className="text-red-200 border border-amber-200"
          onChange={formik.handleChange}
        />
        <small className="text-red-400">{formik.errors.price}</small>

        <textarea
          name="description"
          placeholder="Course Description"
          onChange={formik.handleChange}
        ></textarea>
        <small className="text-red-400">{formik.errors.description}</small>

        <select name="category" onChange={formik.handleChange}>
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
<small className="text-red-400">{formik.errors.category}</small>

        <small className="text-red-400">{formik.errors.category}</small>

        <select name="language" onChange={formik.handleChange}>
            <option value="">Choose Language</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
        <small className="text-red-400">{formik.errors.language}</small>

        <select name="level" onChange={formik.handleChange}>
            <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <small className="text-red-400">{formik.errors.level}</small>

        <select name="accesstype" onChange={formik.handleChange}>
            <option value="">Select Access Type</option>
          <option value="Lifetime">Lifetime</option>
          <option value="Subscription-Based">Subscription-Based</option>
          <option value="Limited-Time Access">Limited-Time Access</option>
        </select>
        <small className="text-red-400">{formik.errors.accesstype}</small>

        <label>Video</label>
        <input type="file" onChange={(e) => handleFileChange(e, setVideo)} />
        <label>Image Cover</label>
        <input type="file" onChange={(e) => handleFileChange(e, setImageCover)} />
        <label>Material</label>
        <input type="file" onChange={(e) => handleFileChange(e, setMaterial)} />

        <button type="submit" className="border border-amber-950">
          Upload Course
        </button>
      </form>
      <div>{msg}</div>
    </>
  );
};

export default Page;
