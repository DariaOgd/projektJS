
const express = require('express');
const router = express.Router();
const { fetchQuestions } = require('../controllers/quizManager'); 

router.get('/', async (req, res) => {
  try {
    const questions = await fetchQuestions();
    console.log('Otrzymane pytania:', questions); 
    res.render('quiz', { questions });
  } catch (error) {
    console.error("Nie udało się wczytać pytań:", error);
    res.status(500).send("Nie udało się wczytać pytań:");
  }
});

module.exports = router;
