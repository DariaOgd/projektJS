const express = require('express');
const mongoose = require('mongoose');
const homeRoute = require('./routes/home');
const path = require('path');
const quizRoute = require('./routes/quiz');

const quizManager = require('./controllers/quizmanager');

require('dotenv').config();


const app = express();
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)

app.use('/', homeRoute);
app.use('/quiz', quizRoute);


app.get('/api/fetchQuestions', async (req, res) => {
    const questions = await quizManager.fetchQuestions();
    res.json(questions);
  });
  
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));



const db = mongoose.connection;

db.on('error', (error) => {
    console.error("Nie udało połączyć do bazy:", error);
});

db.once('open', () => {
    console.log("Połączenie do bazy udane");
});

app.listen(3000, () => {
    console.log('Serwer działa');
});
