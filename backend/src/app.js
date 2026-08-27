const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const morgan = require('morgan');
const logger = require('./config/logger');

const authRoutes = require('./modules/auth/auth.routes');
const accountsRoutes = require('./modules/accounts/accounts.routes');
const catalogRoutes = require('./modules/catalog/catalog.routes');
const collectionsRoutes = require('./modules/collections/collections.routes');
const basketRoutes = require('./modules/basket/basket.routes');
const ratingsRoutes = require('./modules/ratings/ratings.routes');
const statsRoutes = require('./modules/stats/stats.routes');
const { isMongoReady } = require('./config/db');

const app = express();

app.use(helmet());

app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) },
}));

const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').filter(Boolean);
app.use(cors({
  origin: allowedOrigins.length > 0 ? allowedOrigins : '*',
  credentials: true,
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'nimbus-backend',
    mongo: isMongoReady() ? 'connected' : 'fallback-mode',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/collections', collectionsRoutes);
app.use('/api/basket', basketRoutes);
app.use('/api/ratings', ratingsRoutes);
app.use('/api/stats', statsRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack, path: req.path, method: req.method });
  res.status(err.status || 500).json({ error: err.message || 'Unexpected server error.' });
});

module.exports = app;
