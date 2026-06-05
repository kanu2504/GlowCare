const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// Security Middlewares
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.options("*", cors());

app.use("/api/products", (req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// Logging
if (env.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Compression
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static assets from uploads directory
app.use('/uploads', express.static('uploads'));

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GlowCare Wellness API is running smoothly',
    timestamp: new Date()
  });
});

// REST API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Test route to verify MongoDB Connection status
app.get('/api/test', (req, res) => {
  const mongoose = require('mongoose');
  const isConnected = mongoose.connection.readyState === 1;
  res.status(isConnected ? 200 : 500).json({
    success: isConnected,
    message: isConnected ? "MongoDB Connected Successfully" : "MongoDB Connection Failed"
  });
});

// Unhandled Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
