const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correctAnswer: String,
  // Other fields you might need
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
