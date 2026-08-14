import app from './app';
import { config } from './config';

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 EcoVision Express API Service is running on port ${PORT}`);
  console.log(`🌐 Environment: ${config.nodeEnv}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`=======================================================`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Unhandled Rejection:', err.message, err.stack);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err: Error) => {
  console.error('❌ Uncaught Exception:', err.message, err.stack);
  process.exit(1);
});
