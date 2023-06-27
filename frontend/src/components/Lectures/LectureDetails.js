import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import { Box, Grid, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableHead: {
      backgroundColor: theme.palette.primary.main,
    },
    tableHeadCell: {
      color: theme.palette.common.white,
    },
  }));

const LectureDetails = () => {
  const { lectureId } = useParams();
  const [lecture, setLecture] = useState(null);
  const [exams, setExams] = useState(null);
  const [students, setStudents] = useState({});
  const [averageNote, setAverageNote] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    fetchLectureDetails();
  }, []);

  const fetchLectureDetails = async () => {
    try {

      const lectureResponse = await axios.get(`/lectures/${lectureId}`);
      setLecture(lectureResponse.data);
      const lectureName = lectureResponse.data.name;

      const examsResponse = await axios.post('/exams/lectureName', {lectureName: lectureName});
      setExams(examsResponse.data);

      const studentIds = examsResponse.data.map((exam) => Object.keys(exam.notes));
      const uniqueStudentIds = [...new Set(studentIds.flat())];

      const studentsResponse = await Promise.all(
        uniqueStudentIds.map((studentId) => axios.get(`/students/${studentId}`))
      );
      const studentsData = studentsResponse.reduce((acc, response) => {
        const student = response.data;
        return { ...acc, [student._id]: `${student.firstName} ${student.lastName}` };
      }, {});

      setStudents(studentsData);

    } catch (error) {
      console.error('Error fetching lecture details:', error);
    }
  };

  const getLetterGrade = (note) => {
    if (note >= 97 && note <= 100) {
      return 'A+';
    } else if (note >= 93 && note <= 96) {
      return 'A';
    } else if (note >= 90 && note <= 92) {
      return 'A-';
    } else if (note >= 87 && note <= 89) {
      return 'B+';
    } else if (note >= 83 && note <= 86) {
      return 'B';
    } else if (note >= 80 && note <= 82) {
      return 'B-';
    } else if (note >= 77 && note <= 79) {
      return 'C+';
    } else if (note >= 73 && note <= 76) {
      return 'C';
    } else if (note >= 70 && note <= 72) {
      return 'C-';
    } else if (note >= 67 && note <= 69) {
      return 'D+';
    } else if (note >= 65 && note <= 66) {
      return 'D';
    } else {
      return 'F';
    }
  };

  if (!lecture || !exams) {
    return <div>Loading lecture details...</div>;
  }

  const enrolledStudentIds = lecture.students;

  let totalNotes = 0;
  enrolledStudentIds.forEach((student) => {
    const studentId = student._id;
    const studentNotes = exams.map((exam) => exam.notes[studentId]);
    const studentAverageNote = studentNotes.reduce((acc, note) => acc + note, 0) / studentNotes.length;
    totalNotes += studentAverageNote;
  });

  const avgNote = totalNotes / enrolledStudentIds.length;

  return (
    <div>
      <Navbar />
      <Box mt={3} style={{marginLeft: '20px', marginTop: '20px'}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Lecture Details</Typography>
          </Grid>
          <Grid item xs={12} style={{textAlign: 'center'}}>
            <Typography variant="body1">Lecture ID: {lecture._id}</Typography>
          </Grid>
          <Grid item xs={12} style={{textAlign: 'center'}}>
            <Typography variant="body1">Lecture Name: {lecture.name} {lecture.lectureNumber}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Enrolled Students:</Typography>
            <br />
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell className={classes.tableHeadCell}>Full Name</TableCell>
                            <TableCell className={classes.tableHeadCell}>Student Number</TableCell>
                            <TableCell className={classes.tableHeadCell}>Student Email</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {enrolledStudentIds.map((student) => (
                            <TableRow key={student._id}>
                            <TableCell>{students[student._id]}</TableCell>
                            <TableCell>{student.studentNumber}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Exams:</Typography>
            {exams.map((exam) => (
              <Card key={exam._id}>
                <CardContent>
                  <Typography variant="h6">Exam Number: {exam.examNumber}</Typography>
                  <Typography variant="body1">Date: {new Date(exam.date).toLocaleDateString('en-GB')}</Typography>
                  <Typography variant="body1">Type: {exam.type}</Typography>
                  <Typography variant="body1">Average: {avgNote}</Typography>
                  <br />
                  <TableContainer component={Paper}>
                    <Table className={classes.table}>
                      <TableHead className={classes.tableHead}>
                        <TableRow>
                          <TableCell className={classes.tableHeadCell}>Name</TableCell>
                          <TableCell className={classes.tableHeadCell}>Note</TableCell>
                          <TableCell className={classes.tableHeadCell}>Grade</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(exam.notes).map(([studentId, note]) => (
                          <TableRow key={studentId}>
                            <TableCell>{students[studentId]}</TableCell>
                            <TableCell>{note}</TableCell>
                            <TableCell>{getLetterGrade(note)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default LectureDetails;
