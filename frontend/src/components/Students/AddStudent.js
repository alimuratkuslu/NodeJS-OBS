import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Container } from '@material-ui/core';
import { AccountCircle, Mail, Lock } from '@material-ui/icons';
import InputAdornment from '@mui/material/InputAdornment';
import './AddStudent.css';
import Navbar from '../Navbar';

const AddStudent = () => {
  const [studentNumber, setStudentNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudent = {
      studentNumber,
      firstName,
      lastName,
      email,
      password
    };

    try {
      const response = await axios.post('/students/add', newStudent);
      console.log(response.data); 
      
      setStudentNumber('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
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
                label="Student Number"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                fullWidth
                required
                inputProps={{
                  pattern: "\\d{9}",
                  title: "Student number must be 9 digits"
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Surname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
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

export default AddStudent;
