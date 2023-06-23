const router = require('express').Router();
let Professor = require('../models/professor.model');

router.route('/').get((req, res) => {
    Professor.find()
        .then(professors => res.json(professors))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const professorNumber = req.body.professorNumber;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const newProfessor = new Professor({professorNumber,
         password,
         firstName,
         lastName,
         email, });

    newProfessor.save()
        .then(() => res.json('Professor Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Professor.findById(req.params.id)
        .then(professor => res.json(professor))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/number/:professorNumber').get((req, res) => {
    const professorNumber = req.params.professorNumber;

    Professor.findOne({ professorNumber: professorNumber })
        .then(professor => {
            if(!professor){
                throw new Error('Professor not found');
            }
            res.json(professor);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
});

router.route('/:id').delete((req, res) => {
    Professor.findByIdAndDelete(req.params.id)
        .then(() => res.json('Professor Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Professor.findById(req.params.id)
        .then(professor => {
            professor.firstName = req.body.firstName;
            professor.lastName = req.body.lastName;
            professor.email = req.body.email;

            professor.save()
                .then(() => res.json('Professor Updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/passwordUpdate/:id').patch((req, res) => {
    Professor.findById(req.params.id)
        .then(professor => {
            professor.password = req.body.password;

            professor.save()
                .then(() => res.json('Professor Password Updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;