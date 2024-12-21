const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const surveyRoutes = require('./routes/surveys'); // surveyRoutes doğru şekilde bağlandı
const answerRoutes = require('./routes/answerRoutes');
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api', answerRoutes);

app.listen(5000, () => {
  console.log(`Server 5000 portunda çalışıyor.`);
});
