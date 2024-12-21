// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
    
//     if (!token) {
//       return res.status(401).json({ message: 'Yetkilendirme token\'ı bulunamadı' });
//     }

//     const decoded = jwt.verify(token, "jwt_secret_key");
//     req.user = { id: decoded.id };
    
//     next();
//   } catch (error) {
//     console.error('Token doğrulama hatası:', error);
//     res.status(401).json({ message: 'Geçersiz token' });
//   }
// };

// module.exports = authMiddleware;


// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Yetkilendirme token\'ı bulunamadı' });
    }

    const decoded = jwt.verify(token, 'jwt_secret_key');
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    res.status(401).json({ message: 'Geçersiz token' });
  }
};

module.exports = authMiddleware;
