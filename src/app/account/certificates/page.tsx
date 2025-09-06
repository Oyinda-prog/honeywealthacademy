
"use client";

// import Image from "next/image";
import React, { useEffect,  useState } from "react";
import jsPDF from 'jspdf'
import html2canvas from "html2canvas";
import Image from "next/image";
// import Image from "next/image";
interface Certificate {
  certificate_id: string;
  fullname: string;
  course_title: string;
  createdat: string;
  institution_icon: string;
  instructor_signature: string;
}
const Page = () => {
  const [allcertificates, setallcertificates] = useState<Certificate[]>([]);
  const [check, setcheck] = useState(false)
  const refs = React.useRef<Array<HTMLDivElement | null>>([]);
  
  useEffect(() => {
    const id = localStorage.getItem("studentid");
  const getallcertificates = async () => {
    if (id) {
      const response = await fetch(
        "http://localhost/nextjsbackendproject/allstudentcertificates.php",
        {
          method: "POST",
          body: JSON.stringify({ studentid: id }),
        }
      );
      const data = await response.json();
      if (data.status) {
        setcheck(true)
        setallcertificates(data.allcertificates);
      } 
      else if (data.status == "403") {
        console.log('failed');
        
      };
    }
  };

  getallcertificates();
}, []);
useEffect(() => {
  console.log(allcertificates);
}, [allcertificates]);

//   const downloadCertificate = async (index: number) => {
//     const element = refs.current[index];
//     if (!element) return;
//     const canvas = await html2canvas(element);
//     const dataURL = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.href = dataURL;
//     link.download = certificate-${index + 1}.png;
//     link.click();
//   };

const downloadCertificate = async (index: number) => {
const element = refs.current[index]
if (!element) return

const canvas = await html2canvas(element, {
  useCORS: true, 
  allowTaint: false,
  scale: 2, 
})

const imgData = canvas.toDataURL('image/png')
const pdf = new jsPDF('landscape', 'pt', 'a4') 

const pdfWidth = pdf.internal.pageSize.getWidth()
const pdfHeight = (canvas.height * pdfWidth) / canvas.width

pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
pdf.save(`certificate-${index + 1}.pdf`)
}
// const downloadCertificate = async (index: number) => {
//   const element = refs.current[index];
//   if (!element) return;

//   // Wait for all images to fully load
//   const images = Array.from(element.querySelectorAll("img"));
//   await Promise.all(
//     images.map((img) => {
//       if (!img.complete || img.naturalWidth === 0) {
//         return new Promise((resolve) => {
//           img.onload = img.onerror = resolve;
//         });
//       }
//       return Promise.resolve();
//     })
//   );

//   const canvas = await html2canvas(element, {
//     useCORS: true,
//     allowTaint: false,
//     scale: 2,
//   });

//   const imgData = canvas.toDataURL("image/png");
//   const pdf = new jsPDF("landscape", "pt", "a4");

//   const pdfWidth = pdf.internal.pageSize.getWidth();
//   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//   pdf.save(`certificate-${index + 1}.pdf`);
// };


return (
  <>
    <p>hello</p>
    <p>
      {
       Array.isArray(allcertificates)!=true && 
          <p>No Certificates Found Yet</p>
        
      }
    </p>
    <div>
      {check===true && Array.isArray(allcertificates) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {allcertificates.map((certificate, index) => (
            <div key={index} className="text-center shadow">
              <div
                ref={(el) => {
                  if (el)
                    {
                       refs.current[index] = el
                      }; 
                }}
                className="p-4 bg-white"
              >
                <h1>Cerificate of Completion</h1>
                <p>This is to certify that</p>
                <p className="">
                  <i>{certificate.fullname}</i>
                </p>
                <p>has successfully completed the course</p>
                <p>{certificate.course_title}</p>
                <p>after passing the required asessment</p>
                <p>
                  Your dedication and performance reflect a strong commitment
                  to learning and professional growth. We commend your efforts
                  and wish you continued success on your journey.
                </p>
                <h1>Certificate ID: {certificate.certificate_id}</h1>
                <p>
                  Date: {certificate.createdat}
                  <span>
                  <Image
                    src={`http://localhost/nextjsbackendproject/icon-loader.php?file=${certificate.institution_icon}`}
  alt="Institution Icon"
  width="100"
  height="100"
  unoptimized
/>

<Image
  src={`http://localhost/nextjsbackendproject/image-loader.php?folder=uploads&file=${certificate.instructor_signature}`}
  alt="Instructor Signature"
  width="100"
  height="100"
 unoptimized
/>



                    {/* <Image
                      src={http://localhost/nextjsbackendproject/uploads/${certificate.instructor_signature}}
                      alt=""
                      width={100}
                      height={100}
                      // crossOrigin="anonymous"
                      unoptimized
                    ></Image> */}
                  </span>
                </p>
              </div>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => downloadCertificate(index)}
              >
                Download Certificate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
);
};

export default Page;

