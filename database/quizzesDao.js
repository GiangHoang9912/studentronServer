const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const Quiz = require('../entity/quiz');
const { ObjectID, ObjectId } = require('mongodb');
const DATABASE_NAME = 'StudentManagement';


function getAllQuizzes(id, subjectCode, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db(DATABASE_NAME);
    dbo.collection(`Quiz_${subjectCode}_${id}`).find().toArray(function (err, result) {
      if (err) throw err;
      db.close();
      res.json(result);
      res.end();
    });
  });
}

function createQuiz(quizzes, response) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db(DATABASE_NAME);
    const quiz = new Quiz(quizzes.quiz.question, quizzes.quiz.answer, quizzes.quiz.status, quizzes.quiz.userId, quizzes.quiz.correct)
    dbo.collection(`Quiz_${quizzes.subject}_${quiz.userId}`).insertOne(quiz, function (err, res) {
      if (err) {
        response.json({ status: 400 });
        throw err;
      }
      response.json({ status: 200 })
      db.close();
      response.end();
    });
  });
}

function updateQuiz(payload, response) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db(DATABASE_NAME);
    const myQuery = { _id: ObjectId(payload.quizId) };
    const newValues = { $set: payload.quiz };
    dbo.collection(`Quiz_${payload.subject}_${payload.quiz.userId}`).updateOne(myQuery, newValues, function (err, res) {
      if (err) {
        response.json({ status: 400 });
        throw err;
      }
      response.json({ status: 200 })
      db.close();
      response.end();
    });
  });
}

function disableQuiz(payload, response) {
  console.log(payload)
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db(DATABASE_NAME);
    const myQuery = { _id: ObjectId(payload.quiz._id) };
    const newValues = { $set: { status: !payload.quiz.status } };
    dbo.collection(`Quiz_${payload.subject}_${payload.quiz.userId}`).updateOne(myQuery, newValues, function (err, res) {
      if (err) {
        response.json({ status: 400 });
        throw err;
      }
      response.json({ status: 200 })
      db.close();
      response.end();
    });
  });
}


module.exports = { getAllQuizzes, createQuiz, updateQuiz, disableQuiz }