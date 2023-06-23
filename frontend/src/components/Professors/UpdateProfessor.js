import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { CheckCircle, Error, Close } from '@material-ui/icons';
import './AddProfessor.css';

const UpdateProfessor = () => {

  const { id } = useParams(); 
  const [professor, setProfessor] = useState({
    professorNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');

  useEffect(() => {
    fetchProfessor();
  }, []);

  const fetchProfessor = async () => {
    try {
      const response = await axios.get(`/professors/${id}`);
      setProfessor(response.data);
    } catch (error) {
      console.error('Error fetching professor:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfessor((prevProfessor) => ({
      ...prevProfessor,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/professors/update/${id}`, professor);

      setSnackbarMessage('Professor updated successfully.');
      setSnackbarType('success');
      setShowSnackbar(true);
    } catch (error) {
      console.error('Error updating professor:', error);
      setSnackbarMessage('Error updating professor.');
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
      <h3>Edit Professor</h3>
      <form onSubmit={handleSubmit} className='form-wrapper'>
        <div className="form-group">
          <label>Professor Number:</label>
          <input
            type="text"
            className="form-control"
            name="professorNumber"
            value={professor.professorNumber}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={professor.firstName}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={professor.lastName}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={professor.email}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={professor.password}
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

export default UpdateProfessor;
