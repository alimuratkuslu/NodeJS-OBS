const router = require('express').Router();
let Exam = require('../models/exam.model');
let Student = require('../models/student.model');

router.route('/').get((req, res) => {
    Exam.find()
        .then(exams => res.json(exams))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const examNumber = req.body.examNumber;
    const lectureName = req.body.lectureName;
    const date = req.body.date;
    const type = req.body.type;

    const newExam = new Exam({examNumber,
         lectureName,
         date,
         type, });

         newExam.save()
         .then(() => {
             Student.find({ 'lectures.name': lectureName })
                 .then(students => {
                     students.forEach(student => {
                         student.exams.push(newExam);
                     });
 
                     Promise.all(students.map(student => student.save()))
                         .then(() => res.json('Exam Added'))
                         .catch(err => res.status(400).json('Error: ' + err));
                 })
                 .catch(err => res.status(400).json('Error: ' + err));
         })
         .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Exam.findById(req.params.id)
        .then(exam => res.json(exam))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/number/:examNumber').get((req, res) => {
    const examNumber = req.params.examNumber;

    Exam.findOne({ examNumber: examNumber })
        .then(exam => {
            if(!exam){
                throw new Error('Exam not found');
            }
            res.json(exam);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
});

router.route('/:id').delete((req, res) => {
    Exam.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exam Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Exam.findById(req.params.id)
        .then(exam => {
            exam.examNumber = req.body.examNumber;
            exam.lectureName = req.body.lectureName;
            exam.date = req.body.date;
            exam.type = req.body.type;

            exam.save()
                .then(() => res.json('Exam Updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addNote/:id').post((req, res) => {
    const { studentIds, notes } = req.body;

    if (!Array.isArray(studentIds) || !Array.isArray(notes) || studentIds.length !== notes.length) {
        return res.status(400).json('Invalid request body');
    }

    const updates = studentIds.map((studentId, index) => ({
        updateOne: {
        filter: { _id: studentId },
        update: { $set: { note: notes[index] } }
        }
    }));

    Student.bulkWrite(updates)
        .then(() => res.json('Notes added successfully'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;