import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Container, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './AddAssignment.css';
import Navbar from '../Navbar';

const AddAssignment = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [lectureName, setLectureName] = useState('');
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await axios.get('/lectures'); 
      setLectures(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAssignment = {
        name,
        description,
        startDate,
        endDate,
        lectureName
    };

    try {
      const response = await axios.post('/assignments/add', newAssignment);
      console.log(response.data); 
      
      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setLectureName('');
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <div className='form-container'>
      <Navbar />
      <Container maxWidth='sm' className='form-wrapper'>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Assignment Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <br />
            <br />
            <br />
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>
            <br />
            <br />
            <br />
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Lecture Name</InputLabel>
                <Select
                  value={lectureName}
                  onChange={(e) => setLectureName(e.target.value)}
                  required
                >
                  {lectures.map((lecture) => (
                    <MenuItem key={lecture._id} value={lecture.name}>
                      {lecture.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default AddAssignment;
