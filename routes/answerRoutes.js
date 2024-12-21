// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../backend/middleware/authMiddleware');
// const Answer = require('../models/Answer');
// const Survey = require('../models/Survey');

// // Cevap kaydetme route'u
// router.post('/surveys/answer/:id', authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { answers } = req.body;
//     const userId = req.user.id;

//     const survey = await Survey.findById(id);
//     if (!survey) {
//       return res.status(404).json({ message: 'Anket bulunamadı' });
//     }

//     const newAnswer = new Answer({
//       userId,
//       surveyId: id,
//       surveyTitle: survey.title,
//       answers,
//       questions: survey.questions,
//     });

//     await newAnswer.save();

//     res.status(201).json({ message: 'Cevaplarınız başarıyla kaydedildi' });
//   } catch (error) {
//     console.error('Cevap kaydedilirken hata:', error);
//     res.status(500).json({ message: 'Sunucu hatası' });
//   }
// });

// // Kullanıcının cevaplarını getirme route'u
// router.get('/surveys/my-answers', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const answers = await Answer.find({ userId })
//       .sort({ submittedAt: -1 })
//       .select('-userId');

//     res.json(answers);
//   } catch (error) {
//     console.error('Cevaplar getirilirken hata:', error);
//     res.status(500).json({ message: 'Sunucu hatası' });
//   }
// });

// module.exports = router;

// // App.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const answerRoutes = require('./routes/answerRoutes');

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Route'ları ekle
// app.use('/api/auth', authRoutes);
// app.use('/api', answerRoutes); // Yeni eklenen route

// // MongoDB bağlantısı
// mongoose.connect('mongodb://localhost:27017/survey_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB bağlantısı başarılı'))
// .catch((err) => console.error('MongoDB bağlantı hatası:', err));

// const port = 5000;
// app.listen(port, () => {
//     console.log(`Server ${PORT} portunda çalışıyor`);
// });




const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Answer = require('../models/Answer');
const Survey = require('../models/Survey');

// Cevap kaydetme route'u
router.post('/surveys/answer/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;
    const userId = req.user.id;

    const survey = await Survey.findById(id);
    if (!survey) {
      return res.status(404).json({ message: 'Anket bulunamadı' });
    }

    const newAnswer = new Answer({
      userId,
      surveyId: id,
      surveyTitle: survey.title,
      answers,
      questions: survey.questions,
    });

    await newAnswer.save();

    res.status(201).json({ message: 'Cevaplarınız başarıyla kaydedildi' });
  } catch (error) {
    console.error('Cevap kaydedilirken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

router.get('/surveys/my-answers', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const answers = await Answer.find({ userId })
      .sort({ submittedAt: -1 })
      .select('-userId');

    res.json(answers);
  } catch (error) {
    console.error('Cevaplar getirilirken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;