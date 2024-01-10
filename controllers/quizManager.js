const Concept = require('../models/Concept');

const fetchQuestions = async () => {
  try {
    const concepts = await Concept.find({});
    // Map concepts to a format suitable for a quiz
    const questions = concepts.map(concept => ({
      question: concept.concept, // Use concept as the question
      options: [], // Add options if needed
      correctAnswer: concept.definition // Use definition as the correct answer
      // Add more fields as required by your Quiz schema
    }));
    console.log('Fetched questions:', questions);
    return questions;
  } catch (err) {
    console.error('Error fetching questions:', err);
    return [];
  }
};

module.exports = { fetchQuestions };
