// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const router = express.Router();

// // Kullanıcı Kayıt
// router.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: "Kullanıcı oluşturuldu!" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Kullanıcı Giriş
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Geçersiz e-posta veya şifre" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Geçersiz e-posta veya şifre" });

//         const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1h" });
//         res.json({ token });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;

// router.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ error: 'Tüm alanlar doldurulmalıdır.' });
//     }

//     try {
//         // Email adresinin benzersiz olduğunu kontrol et
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Bu email adresi zaten kullanılıyor.' });
//         }

//         // Şifreyi hashle
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Yeni kullanıcıyı kaydet
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: 'Kayıt başarılı!', user: newUser });
//     } catch (err) {
//         console.error('Kayıt sırasında hata:', err);
//         res.status(500).json({ error: 'Sunucu hatası!', details: err.message });
//     }
// });


// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user'); // Kullanıcı modelini kontrol et
// const router = express.Router();

// // Kullanıcı Kayıt
// // routes/auth.js
// router.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ error: "Tüm alanları doldurunuz." });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu!" });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: "Sunucu hatası!", details: err.message });
//     }
// });


// // Login Endpoint
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Geçersiz e-posta veya şifre!" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Geçersiz e-posta veya şifre!" });

//         const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1h" });
//         res.json({ token });
//     } catch (err) {
//         res.status(500).json({ error: "Sunucu hatası!", details: err.message });
//     }
// });

// module.exports = router;



// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // User modelinizi doğru yoldan import ettiğinizden emin olun

// Kayıt ol endpoint'i
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Tüm alanlar doldurulmalıdır.' });
    }

    try {
        // Email benzersiz mi?
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Bu email adresi zaten kullanılıyor.' });
        }

        // Şifre hashle
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yeni kullanıcı oluştur
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Kayıt başarılı!', user: newUser });
    } catch (err) {
        console.error('Kayıt sırasında hata:', err);
        res.status(500).json({ error: 'Sunucu hatası!', details: err.message });
    }
});

// Giriş yap endpoint'i
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Tüm alanlar doldurulmalıdır.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Geçersiz kullanıcı veya şifre.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Geçersiz kullanıcı veya şifre.' });
        }

        // Token üret
        const token = jwt.sign({ id: user._id }, 'jwt_secret_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Giriş başarılı!', token });
    } catch (err) {
        console.error('Giriş sırasında hata:', err);
        res.status(500).json({ error: 'Sunucu hatası!', details: err.message });
    }
});

module.exports = router;
