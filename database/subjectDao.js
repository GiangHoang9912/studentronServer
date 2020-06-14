const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const Subject = require('../entity/subject')

function getAllSubjects(res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db("StudentManagement");
    dbo.collection("Subject").find().toArray(function (err, result) {
      if (err) throw err;
      db.close();
      res.json(result);
      res.end();
    });
  });
}


function createSubject(subjectCode, subjectName) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db("StudentManagement");
    const subject = new Subject(subjectCode, subjectName);
    dbo.collection("Subject").insertOne(subject, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}



module.exports = { getAllSubjects, createSubject }