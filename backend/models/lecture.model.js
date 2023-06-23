const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lectureSchema = new Schema({
    lectureNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    students: [{
      type: mongoose.Schema.Types.Mixed,
      ref: 'Student', 
    }],
    professors: [{
      type: mongoose.Schema.Types.Mixed,
      ref: 'Professor',
    }]
}, {
    timestamps: true,
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;