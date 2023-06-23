const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Add Lectures Array
const professorSchema = new Schema({
    professorNumber: {
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
    }
}, {
    timestamps: true,
});

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;