



const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true
  },
  surveyTitle: {
    type: String,
    required: true
  },
  answers: [{
    type: String,
    required: true
  }],
  questions: [{
    text: {
      type: String,
      required: true
    }
  }],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Answer', AnswerSchema);