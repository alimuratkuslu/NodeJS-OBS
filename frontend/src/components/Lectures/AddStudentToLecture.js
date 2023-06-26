import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import { Typography, Grid, Card, CardContent, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
    },
  }));

const AddStudentToLecture = () => {
  const classes = useStyles();
  const { lectureId } = useParams();
  const [lectureData, setLectureData] = useState(null);
  const [professorData, setProfessorData] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState('');

  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        fetchStudents();
        fetchProfessors();

        const response = await axios.get(`/lectures/${lectureId}`);
        console.log(response.data);
        setLectureData(response.data);

        const professorId = response.data.professors[0];

        const professorResponse = await axios.get(`/professors/${professorId}`);
        setProfessorData(professorResponse.data);

      } catch (error) {
        console.error('Error fetching lecture data:', error);
      }
    };

    fetchLectureData();
  }, [lectureId]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchProfessors = async () => {
    try {
      const response = await axios.get('/professors');
      setProfessors(response.data);
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  const handleStudentChange = (event) => {
    const selectedStudentIds = Array.isArray(event.target.value)
      ? event.target.value
      : Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedStudents(selectedStudentIds);
  };

  const handleProfessorChange = (event) => {
    setSelectedProfessor(event.target.value);
  };

  const handleAddStudents = async () => {
    console.log('Started adding students');
    try {
      await axios.post(`/lectures/addStudents/${lectureId}`, {
        studentIds: selectedStudents,
      });
    } catch (error) {
      console.error('Error adding students to lecture:', error);
    }
  };

  const handleAddProfessor = async () => {
    try {
      await axios.post(`/lectures/addProfessor/${lectureId}`, {
        professorId: selectedProfessor,
      });
    } catch (error) {
      console.error('Error adding professor to lecture:', error);
    }
  };

  const getStudentsInLecture = () => {
    if (!lectureData || !students) {
      return [];
    }

    const lectureId = lectureData._id;

    return students.filter((student) => {
      const lectureIds = student.lectures.map((lecture) => lecture._id);
      return lectureIds.includes(lectureId);
    });
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      {lectureData ? (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              Add Student to Lecture {lectureId}
            </Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" component="p">
                  Lecture Details: {lectureData.lectureNumber} - {lectureData.name}
                </Typography>
              </Grid>
              {professorData ? (
                <Grid item xs={12}>
                    <Typography variant="h6" component="p">
                    Lecture Professor: {professorData.firstName} {professorData.lastName}
                    </Typography>
                </Grid>
              ) : (
                <p>Loading Professor Data...</p>
              )}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" component="p">Enrolled Students:</Typography>
                {getStudentsInLecture().map((student) => (
                  <Typography key={student._id} component="p">
                    {student.firstName} {student.lastName}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <p>Loading Lecture Data...</p>
      )}
      <br />
      <br />
      <Grid item xs={6} style={{ marginLeft: '20px' }}>
        <InputLabel id="student-label">Students</InputLabel>
        <Select
          labelId="student-label"
          value={selectedStudents}
          onChange={handleStudentChange}
          fullWidth
          multiple
          required
        >
          {students.map((student) => (
            <MenuItem key={student._id} value={student._id}>
              {student.firstName} {student.lastName}
            </MenuItem>
          ))}
        </Select>
      </Grid>
        <br />
        <Grid item xs={12} style={{ marginLeft: '20px' }}>
              <Button type="submit" variant="contained" color="primary" onClick={handleAddStudents}>
                Add Student
              </Button>
        </Grid>
        <br />
        <br />
        <Grid item xs={6} style={{ marginLeft: '20px' }}>
            <InputLabel id="professor-label">Professors</InputLabel>
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
        <br />
        <Grid item xs={12} style={{ marginLeft: '20px' }}>
              <Button type="submit" variant="contained" color="primary" onClick={handleAddProfessor}>
                Add Professor
              </Button>
        </Grid>
    </div>
  );
};

export default AddStudentToLecture;