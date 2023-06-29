import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StudentList from './components/Students/StudentList';
import AddStudent from './components/Students/AddStudent';
import UpdateStudent from './components/Students/UpdateStudent';
import LectureList from './components/Lectures/LectureList';
import LectureDetails from './components/Lectures/LectureDetails';
import AddLecture from './components/Lectures/AddLecture';
import UpdateLecture from './components/Lectures/UpdateLecture';
import ExamList from './components/Exams/ExamList';
import AddExam from './components/Exams/AddExam';
import ProfessorList from './components/Professors/ProfessorList';
import AddProfessor from './components/Professors/AddProfessor';
import UpdateProfessor from './components/Professors/UpdateProfessor';
import AddStudentToLecture from './components/Lectures/AddStudentToLecture';
import AddNoteToStudent from './components/Exams/AddNoteToStudent';
import AssignmentList from './components/Assignments/AssignmentList';
import AddAssignment from './components/Assignments/AddAssignment';
import UpdateAssignment from './components/Assignments/UpdateAssignment';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Dashboard />} />
        <Route exact path='/students' element={<StudentList />} />
        <Route exact path='/students/add' element={<AddStudent />} />
        <Route exact path='/students/update/:id' element={<UpdateStudent />} />
        <Route exact path='/lectures' element={<LectureList />} />
        <Route exact path='/lectures/add' element={<AddLecture />} />
        <Route exact path='/lectures/update/:id' element={<UpdateLecture />} />
        <Route exact path='/lectures/details/:lectureId' element={<LectureDetails />} />
        <Route exact path='/exams' element={<ExamList />} />
        <Route exact path='/exams/add' element={<AddExam />} />
        <Route exact path='/professors' element={<ProfessorList />} />
        <Route exact path='/professors/add' element={<AddProfessor />} />
        <Route exact path='/professors/update/:id' element={<UpdateProfessor />} />
        <Route path='/lectures/addStudent/:lectureId' element={<AddStudentToLecture />} />
        <Route path='/exams/addNote/:examId' element={<AddNoteToStudent />} />
        <Route exact path='/assignments' element={<AssignmentList />} />
        <Route exact path='/assignments/add' element={<AddAssignment />} />
        <Route exact path='/assignments/update/:id' element={<UpdateAssignment />} />
      </Routes>
    </Router>

  );
}

export default App;
