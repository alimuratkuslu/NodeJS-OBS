import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const ExamList = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('/exams');
      setExams(response.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  return (
    <div>
        <Navbar />
        <br />
        <h3>Exams</h3>
        <br />
        <Link to="/exams/add" className="btn btn-primary mb-2" style={{ marginLeft: '10px' }}>
          <IconButton>
            <Add />
          </IconButton>
          Create Exam
        </Link>
        <table className='table table-striped'>
            <thead className='thead-light'>
                <tr>
                    <th>Exam Number</th>
                    <th>Lecture Name</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => (
                <tr key={exam._id}>
                  <td>{exam.examNumber}</td>
                  <td>{exam.lectureName}</td>
                  <td>{new Date(exam.date).toLocaleDateString()}</td>
                  <td>{exam.type}</td>
                  <td>
                    <Link to={`/exams/addNote/${exam._id}`} className="btn btn-primary">
                      Enter Note
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
    </div>
  );
};

export default ExamList;
