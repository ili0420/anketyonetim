
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const Answer = require('./models/Answer'); // Answer modelini import ettik
// const answerRoutes = require('../backend/routes/answerRoutes');
// app.use('/api',answerRoutes);
// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Bağlantısı
// mongoose.connect('mongodb://127.0.0.1:27017/anket_db', { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
// })
// .then(() => console.log('MongoDB bağlantısı başarılı'))
// .catch(err => console.error('MongoDB bağlantı hatası:', err));

// // Answer modelini global olarak kullanılabilir yap
// app.set('answerModel', Answer);

// // Auth rotaları
// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);

// // Survey rotaları
// const surveyRoutes = require('./routes/surveys');
// app.use('/api/surveys', surveyRoutes);

// // Port Ayarı ve Sunucuyu Çalıştırma
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));

// module.exports = app;




// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const answerRoutes = require('./routes/answerRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api', answerRoutes);

// // MongoDB bağlantısı
// mongoose.connect('mongodb://127.0.0.1:27017/survey_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB bağlantısı başarılı'))
// .catch((err) => console.error('MongoDB bağlantı hatası:', err));

// const port = 5000;
// app.listen(port, () => {
//   console.log('Server ${port} portunda çalışıyor');
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const Answer = require('./models/Answer'); // Answer modelini import ettik
// const answerRoutes = require('../backend/routes/answerRoutes');
// app.use('/api',answerRoutes);
// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Bağlantısı
// mongoose.connect('mongodb://127.0.0.1:27017/anket_db', { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
// })
// .then(() => console.log('MongoDB bağlantısı başarılı'))
// .catch(err => console.error('MongoDB bağlantı hatası:', err));

// // Answer modelini global olarak kullanılabilir yap
// app.set('answerModel', Answer);

// // Auth rotaları
// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);

// // Survey rotaları
// const surveyRoutes = require('./routes/surveys');
// app.use('/api/surveys', surveyRoutes);

// // Port Ayarı ve Sunucuyu Çalıştırma
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));

// module.exports = app;



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const answerRoutes = require('./routes/answerRoutes');

// const app = express(); // app burada tanımlanmalı

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api', answerRoutes);

// // MongoDB bağlantısı
// mongoose
//   .connect('mongodb://127.0.0.1:27017/survey_db', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('MongoDB bağlantısı başarılı'))
//   .catch((err) => console.error('MongoDB bağlantı hatası:', err));

// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server ${port} portunda çalışıyor`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const surveyRoutes = require('./routes/surveys'); // surveyRoutes doğru şekilde bağlandı

const app = express(); // app tanımı

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes); // surveyRoutes doğru tanımlandı

// MongoDB bağlantısı
mongoose
  .connect('mongodb://127.0.0.1:27017/survey_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

const port = 5000;
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor.`);
});
