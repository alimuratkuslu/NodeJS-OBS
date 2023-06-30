import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';

const AddFileToAssignment = () => {
  const { id } = useParams(); 
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const response = await axios.post(`/assignments/pdfFile/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <form onSubmit={handleSubmit} style={{marginLeft: '20px'}}>
            <input type="file" onChange={handleFileChange} accept="application/pdf" />
            <button type="submit">Submit</button>
        </form>
    </div>
  );
};

export default AddFileToAssignment;
