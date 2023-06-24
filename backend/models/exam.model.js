const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const examSchema = new Schema({
    examNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    lectureName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: ['Midterm', 'Final'],
        required: true,
    },
    notes: {
        type: Map,
        of: Number,
        default: {},
    },
}, {
    timestamps: true,
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;