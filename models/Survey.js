// const mongoose = require('mongoose');

// const QuestionSchema = new mongoose.Schema({
//     text: { type: String, required: true },
//     options: [{ type: String, required: true }]
// });

// const SurveySchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     questions: [QuestionSchema],
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Survey', SurveySchema);

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: [{ type: String }], // Çoktan seçmeli sorular için
    type: { type: String, enum: ['multiple', 'text'], default: 'text' }, // 'multiple' veya 'text'
});

const surveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [questionSchema],
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;