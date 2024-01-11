const express = require('express');
const mongoose = require('mongoose');
const homeRoute = require('./routes/home');
const path = require('path');
const quizRoute = require('./routes/quiz');
const submitQuizRouter = require('./routes/submit-quiz');

const quizManager = require('./controllers/quizmanager');
mongoose.connect('mongodb://127.0.0.1:27017/test');
const app = express();

app.use('/', homeRoute);
app.use('/quiz', quizRoute);
app.use('/submit-quiz', submitQuizRouter);

app.get('/api/fetchQuestions', async (req, res) => {
    const questions = await quizManager.fetchQuestions();
    res.json(questions);
  });
  
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use('/submit-quiz', (req, res) => {
    console.log('Received request at /test');
    console.log('Request Body:', req.body);
  
    // Your logic...
  });

// The following lines are not needed for modern versions of Express
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


app.post('/submit-quiz/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const selectedAnswer = req.body.selectedAnswer;
  
    // Process submitted answer and perform necessary logic
    // For simplicity, let's assume you're just sending the next question index
    const nextQuestionIndex = index + 1;
  
    // Fetch the next question from the server
    Concept.findOne({ concept: questions[nextQuestionIndex].question }, (err, nextQuestion) => {
      if (err) {
        console.error('Error fetching next question:', err);
        res.status(500).send('Error fetching next question');
      } else {
        res.json({ nextQuestionIndex, nextQuestion });
      }
    });
  });
  

const db = mongoose.connection;

db.on('error', (error) => {
    console.error("Database connection error:", error);
});

db.once('open', () => {
    console.log("Database connection successful");
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
