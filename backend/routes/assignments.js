const router = require('express').Router();
const multer = require('multer');
const path = require('path');
let Assignment = require('../models/assignment.model');
let PdfFile = require('../models/pdfFile.model');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

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
    const lectureName = req.body.lectureName;
    const notes = req.body.notes;

    const newAssignment = new Assignment({name,
        description,
        startDate,
        endDate,
        lectureName,
        notes});

        newAssignment.save()
        .then(() => res.json('Assignment Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Assignment.findById(req.params.id)
        .then(assignment => res.json(assignment))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Assignment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Assignment Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Assignment.findById(req.params.id)
        .then(assignment => {
            assignment.name = req.body.name;
            assignment.description = req.body.description;
            assignment.startDate = req.body.startDate;
            assignment.endDate = req.body.endDate;
            assignment.lectureName = req.body.lectureName;

            assignment.save()
                .then(() => res.json('Assignment Updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/lectureName').post((req, res) => {
    const lectureName = req.body.lectureName;

    Assignment.find({ lectureName: lectureName })
    .then(assignments => {
      res.json(assignments);
    })
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
});

router.route('/pdfFile/:id').post(upload.single('pdfFile'), (req, res) => {
    const { path } = req.file;
    const pdfFile = new PdfFile({ path });

    pdfFile.save()
    .then((savedPdfFile) => {
      Assignment.findById(req.params.id)
        .then((assignment) => {
          if (!assignment) {
            return res.status(404).json('Assignment not found');
          }

          assignment.pdfFiles.push(savedPdfFile._id);

          assignment.save()
            .then(() => res.json('Added PDF File'))
            .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/pdfFiles/:id').get((req, res) => {
  const assignmentId = req.params.id;

  Assignment.findById(assignmentId)
    .then(assignment => {
      if (!assignment) {
        return res.status(404).json('Assignment not found');
      }
      
      const pdfFiles = assignment.pdfFiles;
      res.json(pdfFiles);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;