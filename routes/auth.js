const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // User modelinizi doğru yoldan import ettiğinizden emin olun

// Kayıt ol endpoint'i
router.post('/register', async (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;

    // Tüm alanların doldurulup doldurulmadığını kontrol et
    if (!name || !email || !password || !passwordConfirm) {
        return res.status(400).json({ error: 'Tüm alanlar doldurulmalıdır.' });
    }

    // Şifrelerin eşleşip eşleşmediğini kontrol et
    if (password !== passwordConfirm) {
        return res.status(400).json({ error: 'Şifreler eşleşmiyor.' });
    }

    try {
        // Email benzersiz mi?
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Bu email adresi zaten kullanılıyor.' });
        }

        // Şifreyi hashle
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

        const token = jwt.sign({ id: user._id }, 'jwt_secret_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Giriş başarılı!', token });
    } catch (err) {
        console.error('Giriş sırasında hata:', err);
        res.status(500).json({ error: 'Sunucu hatası!', details: err.message });
    }
});

module.exports = router;
