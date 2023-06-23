import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    TextField,
    Button,
    Grid,
    Container,
    Select,
    MenuItem,
    InputLabel,
    FormControlLabel,
    Checkbox
   } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import InputAdornment from '@mui/material/InputAdornment';
import './AddLecture.css';
import Navbar from '../Navbar';

const AddLecture = () => {
  const [lectureNumber, setLectureNumber] = useState('');
  const [name, setName] = useState('');
  const [midterm, setMidterm] = useState('');
  const [final, setFinal] = useState('');
  const [homework, setHomework] = useState('');
  const [project, setProject] = useState('');
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [hasMidterm, setHasMidterm] = useState(false);
  const [hasFinal, setHasFinal] = useState(false);
  const [hasHomework, setHasHomework] = useState(false);
  const [hasProject, setHasProject] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLecture = {
      lectureNumber,
      name,
      midterm: hasMidterm ? midterm : '',
      final: hasFinal ? final : '',
      homework: hasHomework ? homework : '',
      project: hasProject ? project : '',
      professor: selectedProfessor
    };

    try {
      const response = await axios.post('/lectures/add', newLecture);
      console.log(response.data); 
      
      setLectureNumber('');
      setName('');
      setMidterm('');
      setFinal('');
      setHomework('');
      setProject('');
      setHasMidterm(false);
      setHasFinal(false);
      setHasHomework(false);
      setHasProject(false);
    } catch (error) {
      console.error(error); 
    }
  };

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await axios.get('/professors'); 
        setProfessors(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchProfessors();
  }, []);

  return (
    <div className='form-container'>
      <Navbar />
      <Container maxWidth='sm' className='form-wrapper'>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Lecture Number"
                value={lectureNumber}
                onChange={(e) => setLectureNumber(e.target.value)}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Lecture Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Midterm 0-100"
                value={midterm}
                onChange={(e) => setMidterm(e.target.value)}
                fullWidth
                required
                disabled={!hasMidterm}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Final 0-100"
                value={final}
                onChange={(e) => setFinal(e.target.value)}
                fullWidth
                required
                disabled={!hasFinal}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label="Homework 0-100"
                value={homework}
                onChange={(e) => setHomework(e.target.value)}
                fullWidth
                required
                disabled={!hasHomework}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label="Project 0-100"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                fullWidth
                required
                disabled={!hasProject}
              />
            </Grid>
            <Grid item xs={12}>
                <InputLabel id="professor-label">Professor</InputLabel>
                <Select
                    labelId="professor-label"
                    value={selectedProfessor}
                    onChange={(e) => setSelectedProfessor(e.target.value)}
                    fullWidth
                    required
                >
                    {professors.map((professor) => (
                    <MenuItem key={professor._id} value={professor._id}>
                        {professor.firstName} {professor.lastName}
                    </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasMidterm}
                    onChange={() => setHasMidterm(!hasMidterm)}
                  />
                }
                label='Has Midterm'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasFinal}
                    onChange={() => setHasFinal(!hasFinal)}
                  />
                }
                label='Has Final'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasHomework}
                    onChange={() => setHasHomework(!hasHomework)}
                  />
                }
                label='Has Homework'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasProject}
                    onChange={() => setHasProject(!hasProject)}
                  />
                }
                label='Has Project'
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

export default AddLecture;
