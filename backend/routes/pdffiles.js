const router = require('express').Router();
let PdfFile = require('../models/pdfFile.model');

router.route('/').get((req, res) => {
    PdfFile.find()
        .then(files => res.json(files))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    PdfFile.findById(req.params.id)
        .then(file => {
            console.log(file);
            res.json(file);
        }) 
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;