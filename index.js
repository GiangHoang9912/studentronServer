const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { createUser, getUser, getAllStudent, createCollection, getScoreByIdStudent } = require('./database/dbContext')
const app = express();
const PORT = 3000;
//! create Collection
//createCollection('studentScore');
//! create User
//addUser('c', '123', 0);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/login', (req, res) => {
  const { userName, pass } = req.body;
  getUser(userName, pass, res);
})

app.get('/allStudent', (req, res) => {
  getAllStudent(res);
})

app.get('/scoreOfStudent/:id?', (req, res) => {
  const id = req.params.id;
  getScoreByIdStudent(id, res);
})

// app.delete('/student/:id', (req, res) => {
//   const id = req.params.id;
//   dbContext.deleteStudentById(res, id);
// })


// app.put('/student/:id', (req, res) => {
//   const id = req.params.id;
//   const studentJson = req.body;
//   const student = new Student(studentJson.name, studentJson.subject, studentJson.average);
//   dbContext.updateStudentById(res, id, student);
// })



// app.get('/student', (req, res) => {
//   dbContext.getAllStudents(res);
// })

// app.post('/student', (req, res) => {
//   try {
//     const studentJson = req.body;
//     const student = new Student(studentJson.name, studentJson.subject, studentJson.average);
//     dbContext.insertStudent(res, student)
//   } catch (error) {
//     console.log(error)
//   }
// })

app.listen(process.env.PORT || PORT, () => {
  console.log("server is running...!")
})