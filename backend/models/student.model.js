const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Add Lectures Array
const studentSchema = new Schema({
    studentNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    firstName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    lectures: [{
        type: mongoose.Schema.Types.Mixed,
        ref: 'Lecture'
    }],
    exams: [{
        type: mongoose.Schema.Types.Mixed,
        ref: 'Exam'
    }]
}, {
    timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;