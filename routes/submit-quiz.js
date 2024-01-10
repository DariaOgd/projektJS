// Assuming you have a Concept model for questions and answers
const Concept = require('../models/Concept');

// Route to handle quiz submissions
router.post('/submit-quiz', async (req, res) => {
  try {
    // Assuming 'selectedAnswer' contains the user's chosen answer
    const selectedAnswer = req.body.answer;

    // Fetch the correct answer for the current question from the database
    const currentQuestion = await Concept.findOne({ _id: currentQuestionId });


    // Compare the selected answer with the correct answer
    if (selectedAnswer === currentQuestion.correctAnswer) {
      // Handle correct answer logic
      // Increase score or any other actions

      // Fetch the next question from the database
      const nextQuestion = await Concept.findOne({ orderField: { $gt: currentQuestion.orderField } }).sort({ orderField: 1 }).limit(1);


      // Render the next question
      res.render('quiz', { question: nextQuestion }); // Assuming 'quiz.ejs' is your EJS file for the quiz view
    } else {
      // Handle incorrect answer logic
      // Display a message or take appropriate action for wrong answers
    }
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).send("Error submitting quiz");
  }
});
