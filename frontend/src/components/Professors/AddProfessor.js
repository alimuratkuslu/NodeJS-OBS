import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Container } from '@material-ui/core';
import { AccountCircle, Mail, Lock } from '@material-ui/icons';
import InputAdornment from '@mui/material/InputAdornment';
import './AddProfessor.css';
import Navbar from '../Navbar';

const AddProfessor = () => {
  const [professorNumber, setProfessorNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProfessor = {
      professorNumber,
      firstName,
      lastName,
      email,
      password
    };

    try {
      const response = await axios.post('/professors/add', newProfessor);
      console.log(response.data); 
      
      setProfessorNumber('');
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
                label="Professor Number"
                value={professorNumber}
                onChange={(e) => setProfessorNumber(e.target.value)}
                fullWidth
                required
                inputProps={{
                  pattern: "\\d{9}",
                  title: "Professor number must be 9 digits"
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

export default AddProfessor;
