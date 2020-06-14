class Quiz {
  constructor(question, answer, status, userId, correct) {
    this.question = question;
    this.answer = answer;
    this.status = status;
    this.userId = userId;
    this.correct = correct;
  }
}
module.exports = Quiz;