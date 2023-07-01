const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pdfFileSchema = new Schema({
  path: {
    type: String,
    required: true
  }
});

const PdfFile = mongoose.model('PdfFile', pdfFileSchema);

module.exports = PdfFile;
