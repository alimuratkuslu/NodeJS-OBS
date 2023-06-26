const router = require('express').Router();
let Lecture = require('../models/lecture.model');
let Student = require('../models/student.model');
let Professor = require('../models/professor.model');

router.route('/').get((req, res) => {
    Lecture.find()
        .then(lectures => res.json(lectures))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const lectureNumber = req.body.lectureNumber;
    const name = req.body.name;
    const midterm = Number(req.body.midterm);
    const final = Number(req.body.final);
    const homework = Number(req.body.homework);
    const project = Number(req.body.project);
    const professor = req.body.professor;

    const professors = []; 
    professors.push(professor);

    const newLecture = new Lecture({lectureNumber,
        name,
        midterm,
        final,
        homework,
        project,
        students: [],
        professors,});

        newLecture.save()
        .then(() => res.json('Lecture Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Lecture.findById(req.params.id)
        .then(lecture => res.json(lecture))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/number/:lectureNumber').get((req, res) => {
    const lectureNumber = req.params.lectureNumber;

    Lecture.findOne({ lectureNumber: lectureNumber })
        .then(lecture => {
            if(!lecture){
                throw new Error('Lecture not found');
            }
            res.json(lecture);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
});

router.route('/:id').delete((req, res) => {
    Lecture.findByIdAndDelete(req.params.id)
        .then(() => res.json('Lecture Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Lecture.findById(req.params.id)
        .then(lecture => {
            lecture.name = req.body.name;
            lecture.midterm = req.body.midterm;
            lecture.final = req.body.final;
            lecture.homework = req.body.homework;
            lecture.project = req.body.project;

            lecture.save()
                .then(() => res.json('Lecture Updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add Student To Lecture
router.route('/addStudent/:id').post( async (req, res) => {
    const studentId = req.body.studentId;
    const lectureId = req.params.id;

    try {
        const studentData = await Student.findById(studentId);

        if (!studentData) {
        throw new Error('Student not found');
        }

        const updatedLecture = await Lecture.findOneAndUpdate(
        { _id: lectureId },
        { $push: { students: studentData } },
        { new: true }
        ).populate('students');

        const updatedStudent = await Student.findOneAndUpdate(
        { _id: studentId },
        { $push: { lectures: updatedLecture } },
        { new: true }
        ).populate('lectures');

        if (!updatedLecture) {
        throw new Error('Lecture not found');
        }

        const { _id, lectureNumber, name, students } = updatedLecture;

            res.json({
            _id,
            lectureNumber,
            name,
            students
            });

    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
});

// Add multiple Students to Lecture
router.route('/addStudents/:id').post(async (req, res) => {
    const studentIds = req.body.studentIds; 
    const lectureId = req.params.id;
  
    try {
      const lecture = await Lecture.findById(lectureId);
      if (!lecture) {
        throw new Error('Lecture not found');
      }
  
      const students = await Student.find({ _id: { $in: studentIds } });
      if (students.length !== studentIds.length) {
        throw new Error('One or more students not found');
      };

      const updatedLecture = await Lecture.findOneAndUpdate(
        { _id: lectureId },
        { $push: { students: { $each: students } } },
        { new: true }
      ).populate('students');
  
      if (!updatedLecture) {
        throw new Error('Error updating lecture');
      };

      for (const student of students) {
        const updatedStudent = await Student.findOneAndUpdate(
          { _id: student._id },
          { $push: { lectures: updatedLecture } },
          { new: true }
        ).populate('lectures');
      };
      
      res.json(updatedLecture);

    } catch (err) {
      res.status(400).json('Error: ' + err.message);
    }
  });
  

// Add Professor To Lecture
router.route('/addProfessor/:id').post( async (req, res) => {
    const professorId = req.body.professorId; 
    const lectureId = req.params.id;

    try {
        const professorData = await Professor.findById(professorId);

        if (!professorData) {
        throw new Error('Professor not found');
        }

        const updatedLecture = await Lecture.findOneAndUpdate(
        { _id: lectureId },
        { $push: { professors: professorData } },
        { new: true }
        ).populate('professors');

        if (!updatedLecture) {
        throw new Error('Lecture not found');
        }

        const { _id, lectureNumber, name, professors } = updatedLecture;

            res.json({
            _id,
            lectureNumber,
            name,
            professors
            });

    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }

});

module.exports = router;