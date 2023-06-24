import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Container } from '@material-ui/core';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Select } from '@mui/material';
import './AddExam.css';
import Navbar from '../Navbar';


const AddExam = () => {
  const [examNumber, setExamNumber] = useState('');
  const [lectureName, setLectureName] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [lectures, setLectures] = useState([]); 

  useEffect(() => {
    
    const fetchLectures = async () => {
      try {
        const response = await axios.get('/lectures'); 
        setLectures(response.data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchLectures();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExam = {
      examNumber,
      lectureName,
      date,
      type
    };

    try {
      const response = await axios.post('/exams/add', newExam);
      console.log(response.data); 
      
      setExamNumber('');
      setLectureName('');
      setDate('');
      setType('');
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
                label="Exam Number"
                value={examNumber}
                onChange={(e) => setExamNumber(e.target.value)}
                fullWidth
                required
                inputProps={{
                  pattern: "\\d{9}",
                  title: "Exam number must be 9 digits"
                }}
              />
            </Grid>
            <br />
            <br />
            <br />
            <br />
            <Grid item xs={12} style={{marginRight: '30px', marginBottom: '15px'}}>
              <InputLabel>Lecture Name</InputLabel>
                <Select
                  label='Lecture Name'
                  value={lectureName}
                  onChange={(e) => setLectureName(e.target.value)}
                  fullWidth
                  required
                >
                  {lectures.map((lecture) => (
                    <MenuItem key={lecture._id} value={lecture.name}>
                      {lecture.name}
                    </MenuItem>
                  ))}
                </Select>
            </Grid>
            <br />
            <br />
            <br />
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="Midterm">Midterm</MenuItem>
                <MenuItem value="Final">Final</MenuItem>
              </Select>
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

export default AddExam;
