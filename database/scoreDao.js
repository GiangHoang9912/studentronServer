const Datastore = require('nedb');
const Test = require('../entity/test')

const db = new Datastore({ filename: `${__dirname}/score.db` });
db.loadDatabase();


function getScoreByIdStudent(studentId, res) {
  db.find({ studentId: studentId }, function (err, result) {
    res.json(result);
    res.end();
  });
}

function createScore() {
  const test = new Test('ODS9hQMFqj7TJjEH', 8, 'CSD101')
  db.insert(test, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
}

module.exports = { getScoreByIdStudent, createScore }