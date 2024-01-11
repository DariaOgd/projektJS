const express = require('express');
const router = express.Router();

// Assuming you have a function to fetch questions
// const { fetchQuestions } = require('../controllers/quizManager');
// const questions = fetchQuestions(); // Fetch questions once
// let currentQuestionIndex = 0; // Initialize the index of the current question

// const getNextQuestion = () => {
//   if (currentQuestionIndex < questions.length - 1) {
//     // If there are more questions, increment the index and return the next question
//     currentQuestionIndex++;
//     return questions[currentQuestionIndex];
//   } else {
//     // If there are no more questions, return null or handle the end of the quiz
//     return null;
//   }
// };

router.post('/test', (req, res) => {
  console.log('Received POST request at /submit-quiz');
  console.log('Request Body:', req.body);

  // Your existing logic...
});

module.exports = router;
