import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';

const AddNoteToStudent = () => {
  const { examId } = useParams();
  const [students, setStudents] = useState([]);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`/students/lecture/${examId}`);
      console.log(response.data);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleNoteChange = (e, studentId) => {
    const updatedNotes = { ...notes };
    updatedNotes[studentId] = parseInt(e.target.value); 
    setNotes(updatedNotes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/exams/updateExamNotes/${examId}`, { studentMarks: notes });
      console.log('Notes added successfully!');
      setNotes({});
    } catch (error) {
      console.error('Error adding notes:', error);
    }
  };

  return (
    <div style={{marginLeft: '15px'}}>
      <Navbar />
      <br />
      <br />
      <br />
      <h3>Add Notes to Students</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Student Name</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.firstName} {student.lastName}</td>
                <td>
                  <input
                    type="text"
                    value={notes[student._id] || ''}
                    onChange={(e) => handleNoteChange(e, student._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary">
          Save Notes
        </button>
      </form>
      
    </div>
  );
};

export default AddNoteToStudent;