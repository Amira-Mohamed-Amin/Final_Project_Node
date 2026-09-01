require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;


process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

 
  process.on('unhandledRejection', (err) => {
    console.error('💥 Unhandled Rejection! Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
};

startServer();
