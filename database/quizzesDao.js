const Datastore = require('nedb');
const db = new Datastore({ filename: `${__dirname}/quiz.db` });
db.loadDatabase();
const Quiz = require('../entity/quiz');

function getAllQuizzes(id, subjectCode, res) {
  db.find({ subjectCode: subjectCode, userId: id }, function (err, result) {
    if (err) throw err;
    res.json(result);
    res.end();
  });
}

function createQuiz(quizzes, response) {
  const quiz = new Quiz(quizzes.subject, quizzes.quiz.question, quizzes.quiz.answer, quizzes.quiz.status, quizzes.quiz.userId, quizzes.quiz.correct)
  db.insert(quiz, function (err, res) {
    if (err) {
      response.json({ status: 400 });
      throw err;
    }
    response.json({ status: 200 })
    response.end();
  });
}

function updateQuiz(payload, response) {
  const myQuery = { _id: payload.quizId };
  const newValues = { $set: payload.quiz };
  const option = {}
  db.update(myQuery, newValues, option, function (err, res) {
    if (err) {
      response.json({ status: 400 });
      throw err;
    }
    response.json({ status: 200 })
    response.end();
  });
}

function disableQuiz(payload, response) {
  const myQuery = { _id: payload.quiz._id };
  const newValues = { $set: { status: !payload.quiz.status } };
  const option = {};
  db.update(myQuery, newValues, option, function (err, res) {
    if (err) {
      response.json({ status: 400 });
      throw err;
    }
    response.json({ status: 200 })
    response.end();
  });
}


module.exports = {
  getAllQuizzes,
  createQuiz,
  updateQuiz,
  disableQuiz
}