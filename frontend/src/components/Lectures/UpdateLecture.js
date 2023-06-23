import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { CheckCircle, Error, Close } from '@material-ui/icons';
import './AddLecture';

const UpdateLecture = () => {

  const { id } = useParams(); 
  const [lecture, setLecture] = useState({
    lectureNumber: '',
    name: ''
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');

  useEffect(() => {
    fetchLecture();
  }, []);

  const fetchLecture = async () => {
    try {
      const response = await axios.get(`/lectures/${id}`);
      setLecture(response.data);
    } catch (error) {
      console.error('Error fetching lecture:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLecture((prevLecture) => ({
      ...prevLecture,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/lectures/update/${id}`, lecture);

      setSnackbarMessage('Lecture updated successfully.');
      setSnackbarType('success');
      setShowSnackbar(true);
    } catch (error) {
      console.error('Error updating lecture:', error);
      setSnackbarMessage('Error updating lecture.');
      setSnackbarType('error');
      setShowSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <div className='form-container'>
      <Navbar />
      <br />
      <h3>Edit Lecture</h3>
      <form onSubmit={handleSubmit} className='form-wrapper'>
        <div className="form-group">
          <label>Lecture Number:</label>
          <input
            type="text"
            className="form-control"
            name="lectureNumber"
            value={lecture.lectureNumber}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={lecture.name}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
      <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
        >
            <SnackbarContent
            style={{
                backgroundColor: snackbarType === 'success' ? '#43a047' : '#d32f2f'
            }}
            message={
                <span style={{ display: 'flex', alignItems: 'center' }}>
                {snackbarType === 'success' ? (
                    <CheckCircle style={{ marginRight: '8px' }} />
                ) : (
                    <Error style={{ marginRight: '8px' }} />
                )}
                {snackbarMessage}
                </span>
            }
            action={[
                <IconButton key="close" color="inherit" onClick={handleSnackbarClose}>
                <Close />
                </IconButton>
            ]}
            />
      </Snackbar>
    </div>
  );
};

export default UpdateLecture;
