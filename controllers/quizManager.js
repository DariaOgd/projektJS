const Concept = require('../models/Concept');

const fetchQuestions = async () => {
  try {
    const concepts = await Concept.find({});
    
    // Map concepts to a format suitable for a quiz
    const questions = concepts.map(concept => {
      // Use concept as the question
      const question = {
        question: concept.concept,
        answer: concept.definition, // Use definition as the answer
      };

      // Get two additional random choices from concepts (excluding the correct answer)
      const otherConcepts = concepts.filter(c => c.definition !== concept.definition);
      const randomChoices = getRandomChoices(otherConcepts, 2);

      // Assign random choices to question object
      question.choice1 = randomChoices[0];
      question.choice2 = randomChoices[1];

      // Add more fields as required by your Quiz schema

      return question;
    });

    console.log('Fetched questions:', questions);
    return questions;
  } catch (err) {
    console.error('Error fetching questions:', err);
    return [];
  }
};

// Function to get n random choices from an array
const getRandomChoices = (array, n) => {
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, n).map(item => item.definition);
};



module.exports = { fetchQuestions };
