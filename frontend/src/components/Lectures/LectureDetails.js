import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import { Box, Grid, Typography, Card, CardContent } from '@material-ui/core';

const LectureDetails = () => {
  const { lectureId } = useParams();
  const [lecture, setLecture] = useState(null);
  const [exams, setExams] = useState(null);
  const [students, setStudents] = useState({});

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

  if (!lecture || !exams) {
    return <div>Loading lecture details...</div>;
  }

  const enrolledStudentIds = lecture.students;

  return (
    <div>
      <Navbar />
      <Box mt={3} style={{marginLeft: '20px', marginTop: '20px'}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Lecture Details</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Lecture ID: {lecture._id}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Lecture Name: {lecture.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Enrolled Students:</Typography>
            <ul>
              {enrolledStudentIds.map((student) => (
                <li key={student._id}>
                  {students[student._id] && <span>{students[student._id]} - </span>}
                  {student._id}
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Exams:</Typography>
            {exams.map((exam) => (
              <Card key={exam._id}>
                <CardContent>
                  <Typography variant="h6">Exam Number: {exam.examNumber}</Typography>
                  <Typography variant="body1">Date: {new Date(exam.date).toLocaleDateString('en-GB')}</Typography>
                  <Typography variant="body1">Type: {exam.type}</Typography>
                  <Typography variant="body1">Notes:</Typography>
                  <ul>
                    {Object.entries(exam.notes).map(([studentId, note]) => (
                      <li key={studentId}>
                        {students[studentId] && <span>{students[studentId]} - </span>}
                        {note}
                      </li>
                    ))}
                  </ul>
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
