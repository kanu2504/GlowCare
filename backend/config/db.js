const mongoose = require('mongoose');
const dns = require('dns');

// Configure custom DNS servers to prevent DNS querySrv ECONNREFUSED issues on certain networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
  console.warn('[Database] Custom DNS override failed, using default:', err.message);
}

/**
 * Connect to MongoDB Atlas
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!uri) {
    console.error('[Database] ERROR: MONGO_URI is not set in environment variables.');
    throw new Error('MONGO_URI not specified');
  }

  // Set Mongoose options
  mongoose.set('strictQuery', true);

  console.log('[Database] Connecting to MongoDB Atlas...');
  try {
    const conn = await mongoose.connect(uri, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`[Database] MongoDB Connected Successfully: ${conn.connection.host}`);
    
    // Seed default admin and user accounts if not present
    const User = require('../models/User');
    let admin = await User.findOne({ email: 'admin@glowcare.com' });
    if (!admin) {
      await User.create({
        name: 'GlowCare Admin',
        email: 'admin@glowcare.com',
        password: 'Admin@123',
        role: 'admin',
      });
      console.log('[Database] Seeded default admin account: admin@glowcare.com');
    } else {
      admin.password = 'Admin@123';
      await admin.save();
      console.log('[Database] Verified and updated default admin account password to Admin@123');
    }
    
    const userExists = await User.findOne({ email: 'user@glowcare.com' });
    if (!userExists) {
      await User.create({
        name: 'GlowCare User',
        email: 'user@glowcare.com',
        password: 'user123',
        role: 'user',
      });
      console.log('[Database] Seeded default user account: user@glowcare.com');
    }

    return conn;
  } catch (error) {
    console.error(`[Database] MongoDB connection error: ${error.message}`);
    
    // Help user troubleshoot common Atlas errors
    if (error.message.includes('bad auth') || error.message.includes('authentication failed')) {
      console.error('[Database] Troubleshooting Info: Authentication failed. Verify that your username and password are correct in .env');
    } else if (error.message.includes('querySrv ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
      console.error('[Database] Troubleshooting Info: DNS resolution failed. Check your network/DNS settings, or try using standard connection string format instead of dns-srv mongodb+srv.');
    } else if (error.message.includes('MongooseServerSelectionError') || error.message.includes('timeout')) {
      console.error('[Database] Troubleshooting Info: Connection timed out. Make sure your IP is whitelisted (0.0.0.0/0) in MongoDB Atlas Network Access.');
    }
    
    throw error;
  }
};

module.exports = { connectDB };
