import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import { Snackbar, SnackbarContent, IconButton, Select, MenuItem, TextField } from '@material-ui/core';
import { CheckCircle, Error, Close } from '@material-ui/icons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import './AddAssignment.css';

const UpdateAssignment = () => {

  const { id } = useParams(); 
  const [lectures, setLectures] = useState([]);
  const [assignment, setAssignment] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    lectureName: ''
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');

  useEffect(() => {
    fetchAssignment();
    fetchLectures();
  }, []);

  const fetchAssignment = async () => {
    try {
      const response = await axios.get(`/assignments/${id}`);
      const { startDate, endDate, ...rest } = response.data;

      setAssignment((prevAssignment) => ({
        ...prevAssignment,
        ...rest,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      }));
    } catch (error) {
      console.error('Error fetching assignment:', error);
    }
  };

  const fetchLectures = async () => {
    try {
      const response = await axios.get(`/lectures`);
      setLectures(response.data);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'startDate' || name === 'endDate') {
        setAssignment((prevAssignment) => ({
          ...prevAssignment,
          [name]: new Date(value).toISOString(),
        }));
      } else {
        setAssignment((prevAssignment) => ({
          ...prevAssignment,
          [name]: value,
        }));
      }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/assignments/update/${id}`, assignment);

      setSnackbarMessage('Assignment updated successfully.');
      setSnackbarType('success');
      setShowSnackbar(true);
    } catch (error) {
      console.error('Error updating assignment:', error);
      setSnackbarMessage('Error updating assignment.');
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
      <h3>Edit Assignment</h3>
      <form onSubmit={handleSubmit} className='form-wrapper'>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={assignment.name}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Description:</label>
          <br />
          <TextField
                defaultValue={assignment.description}
                onChange={handleInputChange}
                fullWidth
                required
                multiline 
                rows={4}  
                variant="outlined" 
          />
        </div>
        <br />
        <div className="form-group">
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                <DatePicker 
                label="Start Date"
                value={dayjs(assignment.startDate)}
                onChange={(date) => handleInputChange({ target: { name: 'startDate', value: date } })}
                renderInput={(params) => <TextField {...params} />}
                />
          </LocalizationProvider>
        </div>
        <br />
        <div className="form-group">
            <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                <DatePicker 
                label="End Date"
                value={dayjs(assignment.endDate)}
                onChange={(date) => handleInputChange({ target: { name: 'endDate', value: date } })}
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
        <br />
        <div className="form-group">
          <label>Lecture Name:</label>
            <Select
                value={assignment.lectureName}
                onChange={handleInputChange}
                required
                fullWidth
            >
                {lectures.map((lecture) => (
                <MenuItem key={lecture._id} value={lecture.name}>
                    {lecture.name}
                </MenuItem>
                ))}
            </Select>
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

export default UpdateAssignment;
