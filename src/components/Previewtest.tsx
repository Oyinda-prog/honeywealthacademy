
import React from 'react'

interface PreviewtestProps {
    instructorid: string;
    coursecode: string;
  }
  
  const Previewtest: React.FC<PreviewtestProps> = ({ instructorid, coursecode }) => {
    return (
      <div>
        <p>Instructor ID: {instructorid}</p>
        <p>Course Code: {coursecode}</p>
      </div>
    );
  };
  export default Previewtest
  