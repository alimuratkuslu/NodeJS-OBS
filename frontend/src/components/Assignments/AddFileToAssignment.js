import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import { Card, CardContent, Typography, Button, Snackbar } from '@material-ui/core';
import Alert from '@mui/material/Alert';


const AddFileToAssignment = () => {
  const { id } = useParams(); 
  const [selectedFile, setSelectedFile] = useState([]);
  const [assignment, setAssignment] = useState(null);
  const [assignmentFileIds, setAssignmentFileIds] = useState([]);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`/assignments/${id}`);
        setAssignment(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAssignmentFiles = async () => {
      try {
        const response = await axios.get(`/assignments/pdfFiles/${id}`);
        console.log(response.data);
        setAssignmentFileIds(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAssignment();
    fetchAssignmentFiles();
  }, [id]);

  const processFiles = async () => {
    for (const fileId of assignmentFileIds) {
      await handleDownloadFile(fileId);
    }
  };

  const handleDownloadFile = async (fileId) => {
    try {
  
      const response = await axios.get(`/files/${fileId}`);
      const filePath = response.data.path;
      
      const link = document.createElement('a');
      link.href = filePath;
      link.setAttribute('download', `file_${fileId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile([...selectedFile, event.target.files[0]]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentDate = new Date();
    const endDate = new Date(assignment.endDate);

    if (currentDate > endDate) {
        setErrorMessage('End date has passed. Cannot submit file.');
        return;
    };

    const formData = new FormData();
    formData.append('pdfFile', selectedFile[0]);

    try {
      const response = await axios.post(`/assignments/pdfFile/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        processData: false,
        contentType: false,
      });

      setSuccessMessageOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuccessMessageClose = () => {
    setSuccessMessageOpen(false);
  };

  const handleErrorMessageClose = () => {
    setErrorMessage('');
  };

  return (
    <div>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <div>
            {assignment && (
            <Card>
                <CardContent>
                <Typography variant="h5" component="h2">
                    Name: {assignment.name}
                </Typography>
                <br />
                <Typography color="textSecondary">
                    Description: {assignment.description}
                </Typography>
                <Typography color="textSecondary">
                    Start Date: {new Date(assignment.startDate).toLocaleDateString()} 
                </Typography>
                <Typography color="textSecondary">
                    End Date: {new Date(assignment.endDate).toLocaleDateString()} 
                </Typography>
                <Typography color="textSecondary">
                    Lecture Name: {assignment.lectureName} 
                </Typography>
                </CardContent>
            </Card>
            )}
            <br />
            <div style={{marginLeft: '20px'}}>
              {assignmentFileIds.length > 0 && (
                <div>
                  <h3>PDF Files:</h3>
                  {assignmentFileIds.length > 0 ? (
                    assignmentFileIds.map((file) => (
                      <div key={file}>
                        <Typography>File ID: {file}</Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleDownloadFile(file)}
                        >
                          Download
                        </Button>
                      </div>
                    ))
                  ) : (
                    <Typography>No PDF files available.</Typography>
                  )}
                </div>
              )}
            </div>
            <br />
            <br />
            <form onSubmit={handleSubmit} style={{ marginLeft: '20px' }}>
                <input type="file" name='pdfFile' onChange={(e) => handleFileChange(e)} accept="application/pdf" />
                <Button variant='contained' color='primary' type='submit'>Submit</Button>
            </form>
      </div>
      <Snackbar open={successMessageOpen} autoHideDuration={3000} onClose={handleSuccessMessageClose}>
        <Alert elevation={6} variant="filled" onClose={handleSuccessMessageClose} severity="success">
          File uploaded successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={Boolean(errorMessage)} autoHideDuration={3000} onClose={handleErrorMessageClose}>
        <Alert elevation={6} variant="filled" onClose={handleErrorMessageClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddFileToAssignment;
