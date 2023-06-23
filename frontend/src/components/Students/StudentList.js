import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Add, VisibilityOff, Edit, Delete } from '@material-ui/icons';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [showPasswords, setShowPasswords] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`/students/${studentId}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
        <Navbar />
        <br />
        <h3>Students</h3>
        <br />
        <Link to="/students/add" className="btn btn-primary mb-2" style={{ marginLeft: '10px' }}>
          <IconButton>
            <Add />
          </IconButton>
          Create Student
        </Link>
        <table className='table table-striped'>
            <thead className='thead-light'>
                <tr>
                    <th>Student Number</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student._id}>
                  <td>{student.studentNumber}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.email}</td>
                  <td>
                  {showPasswords[index] ? (
                    student.password
                  ) : (
                    <IconButton
                      onClick={() =>
                        setShowPasswords((prevState) => {
                          const updatedShowPasswords = [...prevState];
                          updatedShowPasswords[index] = true;
                          return updatedShowPasswords;
                        })
                      }
                    >
                      <VisibilityOff />
                    </IconButton>
                  )}
                  </td>
                  <td>
                    <Link to={`/students/update/${student._id}`}>
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => handleDeleteStudent(student._id)}>
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

export default StudentList;
