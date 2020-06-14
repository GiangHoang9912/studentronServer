const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";


function createUser(userName, pass, rule) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db("StudentManagement");
    const user = { userName: userName, pass: pass, rule: rule };
    dbo.collection("Account").insertOne(user, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}

function getStudent(userName, pass, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db("StudentManagement");
    dbo.collection("Account").findOne({ userName: userName, pass: pass }, function (err, result) {
      if (err) throw err;
      db.close();
      res.json(result);
      res.end();
    });
  });
}

function getAllStudent(res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db("StudentManagement");
    dbo.collection("Account").find({ rule: 0 }).toArray(function (err, result) {
      if (err) throw err;
      db.close();
      res.json(result);
      res.end();
    });
  });
}

function createCollection(collectionName) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db("StudentManagement");
    dbo.createCollection(collectionName, function (err, res) {
      if (err) throw err;
      console.log(`${collectionName} created!`);
      db.close();
    });
  });
}

function getScoreByIdStudent(studentId, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db("StudentManagement");
    dbo.collection("studentScore").find({ studentId: studentId }).toArray(function (err, result) {
      if (err) throw err;
      db.close();
      res.json(result);
      res.end();
    });
  });
}

module.exports = { getStudent, createUser, getAllStudent, createCollection, getScoreByIdStudent }
