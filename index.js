const express = require('express');
const mongoose = require('mongoose')
const homeRoute = require('./routes/home'); // Import home route
const path = require('path');
const bodyParser= require("body-parser")
mongoose.connect('mongodb://127.0.0.1:27017/test');
const quizRoute = require('./routes/quiz');
const app = express();

app.use('/', homeRoute);
app.use('/quiz', quizRoute);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const db = mongoose.connection;

db.on('error', (error) => {
    console.error("Database connection error:", error);
});

db.once('open', () => {
    console.log("Database connection successful");
});

// Use the home route


// Other configurations and routes...






app.listen(3000, () => {
    console.log('Server running on port 3000');
});
