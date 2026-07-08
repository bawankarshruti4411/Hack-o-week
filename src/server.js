require('dotenv').config();
const app = require('./app');
const prisma = require('./config/database');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ─── Connect Database & Start Server ────────────────────────────────
const startServer = async () => {
  try {
    // Connect to PostgreSQL via Prisma
    await prisma.$connect();
    console.log('✅ PostgreSQL Database connected via Prisma');

    // Start HTTP server
    const server = app.listen(PORT, () => {
      console.log('\n══════════════════════════════════════════════');
      console.log('   🎓  Student Management API');
      console.log('══════════════════════════════════════════════');
      console.log(`  ✅  Server    : http://localhost:${PORT}`);
      console.log(`  📄  Docs      : http://localhost:${PORT}/api-docs`);
      console.log(`  🏥  Health    : http://localhost:${PORT}/api/v1/health`);
      console.log(`  🌍  Env       : ${NODE_ENV}`);
      console.log('══════════════════════════════════════════════\n');
    });

    // ─── Graceful Shutdown ─────────────────────────────────────────
    const shutdown = (signal) => {
      console.log(`\n⚠️  ${signal} received. Gracefully shutting down...`);
      server.close(() => {
        console.log('✅  HTTP server closed.');
        process.exit(0);
      });

      // Force close after 10s
      setTimeout(() => {
        console.error('❌  Forced shutdown after timeout.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('❌  Server failed to start:', error.message);
    process.exit(1);
  }
};

// ─── Handle Unhandled Errors ─────────────────────────────────────────
process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥  Unhandled Rejection at:', promise, '\n   Reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('🔥  Uncaught Exception:', error.message);
  process.exit(1);
});

startServer();
