const router = require('express').Router();
let Student = require('../models/student.model');
let Exam = require('../models/exam.model');

router.route('/').get((req, res) => {
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const studentNumber = req.body.studentNumber;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const newStudent = new Student({studentNumber,
         password,
         firstName,
         lastName,
         email, });

    newStudent.save()
        .then(() => res.json('Student Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/number/:studentNumber').get((req, res) => {
    const studentNumber = req.params.studentNumber;

    Student.findOne({ studentNumber: studentNumber })
        .then(student => {
            if(!student){
                throw new Error('Student not found');
            }
            res.json(student);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
});

router.route('/:id').delete((req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.json('Student Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            student.firstName = req.body.firstName;
            student.lastName = req.body.lastName;
            student.email = req.body.email;

            student.save()
                .then(() => res.json('Student Updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/passwordUpdate/:id').patch((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            student.password = req.body.password;

            student.save()
                .then(() => res.json('Student Password Updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/lecture/:examId').get((req, res) => {
    const examId = req.params.examId;

    Exam.findById(examId)
        .then((exam) => {
        const lectureName = exam.lectureName;

        Student.find({ 'lectures.name': lectureName })
            .then((students) => res.json(students))
            .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;