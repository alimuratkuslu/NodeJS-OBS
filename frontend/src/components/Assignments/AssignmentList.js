import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Add, Edit, Delete } from '@material-ui/icons';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('/assignments');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      await axios.delete(`/assignments/${assignmentId}`);
      fetchAssignments();
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  return (
    <div>
        <Navbar />
        <br />
        <h3>Assignments</h3>
        <br />
        <Link to="/assignments/add" className="btn btn-primary mb-2" style={{ marginLeft: '10px' }}>
          <IconButton>
            <Add />
          </IconButton>
          Create Assignment
        </Link>
        <table className='table table-striped'>
            <thead className='thead-light'>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Lecture Name</th>
                </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment._id}>
                  <td>{assignment.name}</td>
                  <td>{assignment.description}</td>
                  <td>{new Date(assignment.startDate).toLocaleDateString()}</td>
                  <td>{new Date(assignment.endDate).toLocaleDateString()}</td>
                  <td>{assignment.lectureName}</td>
                  <td>
                    <Link to={`/assignments/update/${assignment._id}`}>
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => handleDeleteAssignment(assignment._id)}>
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

export default AssignmentList;
