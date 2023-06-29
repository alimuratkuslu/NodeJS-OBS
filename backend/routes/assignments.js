const router = require('express').Router();
let Assignment = require('../models/assignment.model');

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

module.exports = router;