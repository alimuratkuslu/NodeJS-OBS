const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

const studentsRouter = require('./routes/students');
const professorsRouter = require('./routes/professors');
const lecturesRouter = require('./routes/lectures');
const examsRouter = require('./routes/exams');
const assignmentsRouter = require('./routes/assignments');

app.use('/students', studentsRouter);
app.use('/professors', professorsRouter);
app.use('/lectures', lecturesRouter);
app.use('/exams', examsRouter);
app.use('/assignments', assignmentsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});