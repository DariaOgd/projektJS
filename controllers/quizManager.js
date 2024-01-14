const Concept = require('../models/Concept');

const fetchQuestions = async () => {
  try {
    const concepts = await Concept.find({});
    
    const questions = concepts.map(concept => {
      const question = {
        question: concept.concept,
        answer: concept.definition,
      };

      const otherConcepts = concepts.filter(c => c.definition !== concept.definition);
      const randomChoices = getRandomChoices(otherConcepts, 2);

      question.choice1 = randomChoices[0];
      question.choice2 = randomChoices[1];

      return question;
    });

    console.log('Fetched questions:', questions);
    return questions;
  } catch (err) {
    console.error('Error fetching questions:', err);
    return [];
  }
};

const getRandomChoices = (array, n) => {
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, n).map(item => item.definition);
};

module.exports = { fetchQuestions };
