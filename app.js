const express = require('express');
const answerRoutes = require('./routes/answerRoutes');

const app = express();

app.use(express.json());
app.use('/api', answerRoutes); // Rotayı burada tanımladık

module.exports = app;
