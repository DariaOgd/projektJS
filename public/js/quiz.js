let currentQuestionIndex = 0;
let questions = [];
let shuffledChoices = [];
let score = 0;

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const fetchQuestions = async () => {
    try {
        const response = await fetch('/api/fetchQuestions');
        const questions = await response.json();
        const questionsArray = Array.isArray(questions) ? questions : [questions];
        return questionsArray;
    } catch (err) {
        console.error('Error fetching questions:', err);
        return [];
    }
};

const displayQuestion = () => {
    const quizContainer = document.getElementById('quiz-container');
    const scoreDisplay = document.getElementById('score-display');

    quizContainer.innerHTML = '';
    scoreDisplay.innerHTML = `Wynik: ${score}`;

    const fetchedQuestions = questions;
    if (fetchedQuestions.length > 0 && currentQuestionIndex < fetchedQuestions.length) {
        const question = fetchedQuestions[currentQuestionIndex];
        const choices = [question.choice1, question.choice2, question.answer];
        shuffledChoices = shuffleArray(choices);

        const questionHTML = `<p>Pytanie: ${question.question}</p>`;
        const choicesHTML = shuffledChoices.map((choice, index) => `<div class="choice" onclick="checkChoice(${index})">${choice}</div>`).join('');

        quizContainer.innerHTML = `${questionHTML}${choicesHTML}`;

        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 3000);
    } else {
        console.log('No questions available or index out of bounds.');
        scoreDisplay.innerHTML = `<p>Quiz skończony! Wynik: ${score}</p>`;
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
    }
};

const checkChoice = (choiceIndex) => {
    const userAnswer = shuffledChoices[choiceIndex];
    const correctAnswer = questions[currentQuestionIndex].answer;

    document.querySelectorAll('.choice').forEach(choice => {
        choice.classList.remove('correct-choice', 'wrong-choice');
    });

    const selectedChoice = document.querySelectorAll('.choice')[choiceIndex];

    if (userAnswer === correctAnswer) {
        selectedChoice.classList.add('correct-choice');
        score++;
    } else {
        selectedChoice.classList.add('wrong-choice');
    }
};

fetchQuestions().then(data => {
    questions = data;
    displayQuestion();
});
