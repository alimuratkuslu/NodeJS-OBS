import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core'; 
import Navbar from '../Navbar';
import { Add, Edit, Delete } from '@material-ui/icons';

const LectureList = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await axios.get('/lectures');
      console.log(response.data);
      
      const lecturesWithProfessors = await Promise.all(response.data.map(fetchProfessorDetails));
      setLectures(lecturesWithProfessors);

    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  const fetchProfessorDetails = async (lecture) => {
    try {
      const professorPromises = lecture.professors.map(async (professorId) => {
        const response = await axios.get(`/professors/${professorId}`);
        return response.data;
      });

      const professors = await Promise.all(professorPromises);

      return {
        ...lecture,
        professors,
      };
    } catch (error) {
      console.error('Error fetching professor details:', error);
      return lecture;
    }
  };

  const handleDeleteLecture = async (lectureId) => {
    try {
      await axios.delete(`/lectures/${lectureId}`);
      fetchLectures();
    } catch (error) {
      console.error('Error deleting lecture:', error);
    }
  };

  return (
    <div>
        <Navbar />
        <br />
        <h3>Lectures</h3>
        <br />
        <Link to="/lectures/add" className="btn btn-primary mb-2" style={{ marginLeft: '20px' }}>
          <IconButton>
            <Add />
          </IconButton>
          Create Lecture
        </Link>
        <table className='table table-striped' style={{marginLeft: '20px'}}>
            <thead className='thead-light'>
                <tr>
                    <th>Lecture Number</th>
                    <th>Name</th>
                    <th>Mid Term</th>
                    <th>Final</th>
                    <th>Homework</th>
                    <th>Project</th>
                    <th>Professors</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
              {lectures.map((lecture, index) => (
                <tr key={lecture._id}>
                  <td>{lecture.lectureNumber}</td>
                  <td>{lecture.name}</td>
                  <td>{lecture.midterm === 0 ? '-' : lecture.midterm}</td>
                  <td>{lecture.final === 0 ? '-' : lecture.final}</td>
                  <td>{lecture.homework === 0 ? '-' : lecture.homework}</td>
                  <td>{lecture.project === 0 ? '-' : lecture.project}</td>
                  <td>
                    {lecture.professors.map((professor, index) => (
                      <div key={index}>
                        {professor.firstName} {professor.lastName}
                      </div>
                    ))}
                  </td>
                  <td>
                    <Link to={`/lectures/addStudent/${lecture._id}`} className="btn btn-primary">
                      Add Student
                    </Link>
                    <br />
                    <Link to={`/lectures/update/${lecture._id}`}>
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => handleDeleteLecture(lecture._id)}>
                      <Delete />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
    </div>
  );
};

export default LectureList;
