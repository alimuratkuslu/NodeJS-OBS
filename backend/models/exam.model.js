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
        unique: true,
        trim: true,
        minlength: 3
    },
    mark: {
        type: Number,
        default: 0,
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
}, {
    timestamps: true,
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;