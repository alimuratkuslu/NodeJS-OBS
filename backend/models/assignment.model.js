const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    pdfFile: {
      data: Buffer,
      contentType: String
    },
    lectureName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    notes: {
      type: Map,
      of: String,
      default: {}
    }
  }, {
    timestamps: true
  });
  
  const Assignment = mongoose.model('Assignment', assignmentSchema);
  
  module.exports = Assignment;