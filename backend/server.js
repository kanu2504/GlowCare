require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to database first
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`[Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

    // Handle Graceful Shutdown signals
    const gracefulShutdown = async () => {
      const mongoose = require('mongoose');
      console.log('[Process] SIGTERM/SIGINT received. Initiating graceful shutdown...');
      server.close(async () => {
        if (mongoose.connection.readyState !== 0) {
          await mongoose.connection.close();
          console.log('[Database] MongoDB connection closed gracefully.');
        }
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  })
  .catch((err) => {
    console.error(`[Server] Database connection failed. Exiting server startup: ${err.message}`);
    process.exit(1);
  });

// Handle Unhandled Promise Rejections and Uncaught Exceptions globally
process.on('unhandledRejection', (err) => {
  console.error(`[Process] Unhandled Rejection: ${err.stack || err.message}`);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(`[Process] Uncaught Exception: ${err.stack || err.message}`);
  process.exit(1);
});
