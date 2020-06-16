const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const {
  createUser,
  getStudent,
  getAllStudent
} = require('./database/studentDao')

const { getAllQuizzes, createQuiz, updateQuiz, disableQuiz, getExam } = require('./database/quizzesDao')

const { getAllSubjects, createSubject, deleteSubjectById } = require('./database/subjectDao')

const { getScoreByIdStudent, createScore } = require('./database/scoreDao')

const app = express();
const PORT = 3000;

//! create User
//createUser('c', '123', 0);
//! create Score
//createScore();
//!create SubjectMAE101
// createSubject('CSD101', 'Data Structures and Algorithms')
// createSubject('MAE101', 'Mathematics for Engineering')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/login', (req, res) => {
  const { userName, pass } = req.body;
  getStudent(userName, pass, res);
})

app.get('/allStudent', (req, res) => {
  getAllStudent(res);
})

app.get('/scoreOfStudent/:id?', (req, res) => {
  const id = req.params.id;
  getScoreByIdStudent(id, res);
})

app.get('/getSubjects', (req, res) => {
  getAllSubjects(res)
})

app.post('/getAllQuizzes', (req, res) => {
  const { userId, subjectCode } = req.body;
  getAllQuizzes(userId, subjectCode, res);
})

app.post('/postQuiz', (req, res) => {
  createQuiz(req.body, res)
})

app.put('/updateQuiz', (req, res) => {
  updateQuiz(req.body, res);
})

app.put('/disableQuiz', (req, res) => {
  disableQuiz(req.body, res);
})

app.post('/addSubject', (req, res) => {
  const { subjectCode, subjectName } = req.body
  createSubject(subjectCode, subjectName, res);
})

app.get('/getTestExam/:code?', (req, res) => {
  const code = req.params.code;
  const splitCode = code.split('_');
  const subjectCode = splitCode[0];
  const userId = splitCode[1];
  getExam(userId, subjectCode, res)
  //getAllQuizzes(userId, subjectCode, res);  
})

app.delete('/delete/:code?', (req, res) => {
  const id = req.params.code;
  deleteSubjectById(res, id);
})

// app.post('/postSubject', (req, res) => {
//   const { subjectCode, subjectName } = req.body
// })

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