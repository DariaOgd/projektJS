
const express = require('express');
const router = express.Router();
const { fetchQuestions } = require('../controllers/quizManager'); 

router.get('/', async (req, res) => {
  try {
    const questions = await fetchQuestions();
    console.log('Received questions:', questions); // Check if questions are fetched correctly
    res.render('quiz', { questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Error fetching questions");
  }
});

module.exports = router;
