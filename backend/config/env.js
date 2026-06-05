const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  mongodbUri: process.env.MONGODB_URI || process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || 'glowcare_wellness_secret_key_2026',
  nodeEnv: process.env.NODE_ENV || 'development'
};

// Simple validations
if (!config.mongodbUri) {
  console.warn('WARNING: MONGODB_URI environment variable is not defined.');
}

if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET environment variable is not defined. Using a default fallback secret.');
}

module.exports = config;
