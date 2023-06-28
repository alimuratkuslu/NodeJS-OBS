const router = require('express').Router();
const multer = require('multer');
let Assignment = require('../models/assignment.model');

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now + file.originalname);
    }, 
});

const upload = multer({
    storage: Storage
}).single('testPdfFile');

router.route('/').get((req, res) => {
    Assignment.find()
        .then(assignments => res.json(assignments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const name = req.body.name;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const pdfFile = req.file;
    const lectureName = req.body.lectureName;
    const notes = req.body.notes;

    const newAssignment = new Assignment({name,
        description,
        startDate,
        endDate,
        pdfFile,
        lectureName,
        lectureName,});

        newAssignment.save()
        .then(() => res.json('Assignment Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;