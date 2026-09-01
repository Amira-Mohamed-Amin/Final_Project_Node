const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const errorMiddleware = require('./middlewares/error.middleware');
const AppError = require('./utils/AppError');

const app = express();


app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static('uploads'));


const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200, 
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
});
app.use('/api', globalLimiter);


const safeMount = (routePath, mountPoint) => {
  try {
    const router = require(routePath);
    app.use(mountPoint, router);
    console.log(`✅ Mounted: ${mountPoint}`);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.warn(`⚠️  Route not found yet, skipping: ${routePath} -> ${mountPoint}`);
    } else {
      
      console.error(`❌ Error loading ${routePath}:`, err.message);
    }
  }
};

safeMount('./routes/auth.routes', '/api/auth');
safeMount('./routes/user.routes', '/api/users');
safeMount('./routes/post.routes', '/api/posts');
safeMount('./routes/comment.routes', '/api/comments');


app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running 🚀' });
});


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});


app.use(errorMiddleware);

module.exports = app;
