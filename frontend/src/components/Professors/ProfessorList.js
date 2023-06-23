import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Add, VisibilityOff, Edit, Delete } from '@material-ui/icons';

const ProfessorList = () => {
  const [professors, setProfessors] = useState([]);
  const [showPasswords, setShowPasswords] = useState([]);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await axios.get('/professors');
      setProfessors(response.data);
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  const handleDeleteProfessor = async (professorId) => {
    try {
      await axios.delete(`/professors/${professorId}`);
      fetchProfessors();
    } catch (error) {
      console.error('Error deleting professor:', error);
    }
  };

  return (
    <div>
        <Navbar />
        <br />
        <h3>Professors</h3>
        <br />
        <Link to="/professors/add" className="btn btn-primary mb-2" style={{ marginLeft: '10px' }}>
          <IconButton>
            <Add />
          </IconButton>
          Create Professor
        </Link>
        <table className='table table-striped'>
            <thead className='thead-light'>
                <tr>
                    <th>Professor Number</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
              {professors.map((professor, index) => (
                <tr key={professor._id}>
                  <td>{professor.professorNumber}</td>
                  <td>{professor.firstName}</td>
                  <td>{professor.lastName}</td>
                  <td>{professor.email}</td>
                  <td>
                  {showPasswords[index] ? (
                    professor.password
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
                    <Link to={`/professors/update/${professor._id}`}>
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => handleDeleteProfessor(professor._id)}>
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

export default ProfessorList;
