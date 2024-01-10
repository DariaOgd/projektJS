const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  // Other fields you might want to include
  // ...
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
