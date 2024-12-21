// // const express = require('express');
// // const mongoose = require('mongoose');
// // const router = express.Router();
// // const Survey = require('../models/Survey');

// // // Yeni anket oluşturma rotası
// // router.post('/create', async (req, res) => {
// //     try {
// //         const { title, questions } = req.body;

// //         if (!title || !questions || questions.length === 0) {
// //             return res.status(400).json({ message: 'Anket başlığı ve soruları doldurulmalıdır.' });
// //         }

// //         const survey = new Survey({ title, questions });
// //         await survey.save();
// //         res.status(201).json({ message: 'Anket başarıyla oluşturuldu.', survey });
// //     } catch (error) {
// //         console.error('Anket oluşturulurken hata:', error);
// //         res.status(500).json({ message: 'Sunucu hatası oluştu.', details: error.message });
// //     }
// // });

// // // Belirli bir anketi ID ile getirme
// // router.get('/:id', async (req, res) => {
// //     try {
// //         const surveyId = req.params.id;

// //         // ObjectId formatını kontrol et
// //         if (!mongoose.Types.ObjectId.isValid(surveyId)) {
// //             return res.status(400).json({ error: 'Geçersiz anket ID formatı.' });
// //         }

// //         const survey = await Survey.findById(surveyId);
// //         if (!survey) {
// //             return res.status(404).json({ error: 'Anket bulunamadı' });
// //         }
// //         res.json(survey);
// //     } catch (error) {
// //         console.error('Survey fetch error:', error.message);
// //         res.status(500).json({ error: 'Sunucu hatası oluştu.', details: error.message });
// //     }
// // });

// // // Anket cevaplarını kaydetme endpoint'i
// // router.post('/answer/:id', async (req, res) => {
// //     try {
// //         const surveyId = req.params.id;
// //         const { answers } = req.body;

// //         // ObjectId formatını kontrol et
// //         if (!mongoose.Types.ObjectId.isValid(surveyId)) {
// //             return res.status(400).json({ error: 'Geçersiz anket ID formatı.' });
// //         }

// //         // Yeni cevap oluştur
// //         const answer = new Answer({
// //             surveyId: surveyId,
// //             respondentId: 'anonymous', // veya kullanıcı ID'si
// //             responses: answers.map(answer => ({ answer }))
// //         });

// //         await answer.save();
// //         res.status(201).json({ message: 'Cevaplar başarıyla kaydedildi.' });
// //     } catch (error) {
// //         console.error('Cevap kaydetme hatası:', error);
// //         res.status(500).json({ error: 'Sunucu hatası oluştu.', details: error.message });
// //     }
// // });

// // // Tüm anketleri getirme endpoint'i
// // router.get('/', async (req, res) => {
// //     try {
// //         const surveys = await Survey.find();
// //         res.json(surveys);
// //     } catch (error) {
// //         console.error('Anketler getirilirken hata:', error);
// //         res.status(500).json({ error: 'Sunucu hatası oluştu.' });
// //     }
// // });

// // module.exports = router;




// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router();
// const Survey = require('../models/Survey');
// const Answer = require('../models/Answer'); // Eksik model eklendi

// // Yeni anket oluşturma rotası
// router.post('/create', async (req, res) => {
//     try {
//         const { title, questions } = req.body;

//         if (!title || !questions || questions.length === 0) {
//             return res.status(400).json({ message: 'Anket başlığı ve soruları doldurulmalıdır.' });
//         }

//         const survey = new Survey({ title, questions });
//         await survey.save();
//         res.status(201).json({ message: 'Anket başarıyla oluşturuldu.', survey });
//     } catch (error) {
//         console.error('Anket oluşturulurken hata:', error);
//         res.status(500).json({ message: 'Sunucu hatası oluştu.', details: error.message });
//     }
// });

// // Belirli bir anketi ID ile getirme
// router.get('/:id', async (req, res) => {
//     try {
//         const surveyId = req.params.id;

//         if (!mongoose.Types.ObjectId.isValid(surveyId)) {
//             return res.status(400).json({ error: 'Geçersiz anket ID formatı.' });
//         }

//         const survey = await Survey.findById(surveyId);
//         if (!survey) {
//             return res.status(404).json({ error: 'Anket bulunamadı.' });
//         }
//         res.json(survey);
//     } catch (error) {
//         console.error('Survey fetch error:', error.message);
//         res.status(500).json({ error: 'Sunucu hatası oluştu.', details: error.message });
//     }
// });

// // Anket cevaplarını kaydetme endpoint'i
// router.post('/answer/:id', async (req, res) => {
//     try {
//         const surveyId = req.params.id;
//         const { answers } = req.body;

//         if (!mongoose.Types.ObjectId.isValid(surveyId)) {
//             return res.status(400).json({ error: 'Geçersiz anket ID formatı.' });
//         }

//         const answer = new Answer({
//             surveyId: surveyId,
//             respondentId: 'anonymous', // Eğer kullanıcı kimlik doğrulaması varsa, buraya kullanıcı ID'si koyabilirsiniz.
//             responses: answers.map((answer) => ({ answer })),
//         });

//         await answer.save();
//         res.status(201).json({ message: 'Cevaplar başarıyla kaydedildi.', answer });
//     } catch (error) {
//         console.error('Cevap kaydetme hatası:', error);
//         res.status(500).json({ error: 'Sunucu hatası oluştu.', details: error.message });
//     }
// });

// // Tüm anketleri getirme endpoint'i
// router.get('/', async (req, res) => {
//     try {
//         const surveys = await Survey.find();
//         res.json(surveys);
//     } catch (error) {
//         console.error('Anketler getirilirken hata:', error);
//         res.status(500).json({ error: 'Sunucu hatası oluştu.' });
//     }
// });

// module.exports = router;



// backend/routes/surveys.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Survey = require('../models/Survey');
const Answer = require('../models/Answer');
const authMiddleware = require('../middleware/authMiddleware');

// Yeni anket oluşturma (korumalı endpoint)
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { title, questions } = req.body;

        if (!title || !questions || questions.length === 0) {
            return res.status(400).json({ message: 'Anket başlığı ve soruları doldurulmalıdır.' });
        }

        const survey = new Survey({ title, questions });
        await survey.save();
        res.status(201).json({ message: 'Anket başarıyla oluşturuldu.', survey });
    } catch (error) {
        console.error('Anket oluşturulurken hata:', error);
        res.status(500).json({ message: 'Sunucu hatası oluştu.', details: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const surveyId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(surveyId)) {
            return res.status(400).json({ error: 'Geçersiz anket ID formatı.' });
        }

        const survey = await Survey.findById(surveyId);
        if (!survey) {
            return res.status(404).json({ error: 'Anket bulunamadı.' });
        }
        res.json(survey);
    } catch (error) {
        console.error('Survey fetch error:', error.message);
        res.status(500).json({ error: 'Sunucu hatası oluştu.', details: error.message });
    }
});

router.post('/answer/:id', async (req, res) => {
    try {
        const surveyId = req.params.id;
        const { answers } = req.body;

        if (!mongoose.Types.ObjectId.isValid(surveyId)) {
            return res.status(400).json({ error: 'Geçersiz anket ID formatı.' });
        }

        const answer = new Answer({
            surveyId: surveyId,
            respondentId: 'anonymous',
            responses: answers.map((answerText) => ({ answer: answerText })),
        });

        await answer.save();
        res.status(201).json({ message: 'Cevaplar başarıyla kaydedildi.', answer });
    } catch (error) {
        console.error('Cevap kaydetme hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası oluştu.', details: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const surveys = await Survey.find();
        res.json(surveys);
    } catch (error) {
        console.error('Anketler getirilirken hata:', error);
        res.status(500).json({ error: 'Sunucu hatası oluştu.' });
    }
});

module.exports = router;
