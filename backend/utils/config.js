require('dotenv').config();

const { NODE_ENV, JWT_SECRET, DB, ALLOWED_CORS_PRODUCTION } = process.env;

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
const MONGO_DB =
  NODE_ENV === 'production' ? DB : 'mongodb://127.0.0.1:27017/movieExplorer';
const PORT = 3001;

const ALLOWED_CORS =
  NODE_ENV === 'production'
    ? ALLOWED_CORS_PRODUCTION
    : ['http://localhost:3001', 'http://localhost:3000'];

const CORS_OPTIONS = {
  credentials: true,
  origin: ALLOWED_CORS,
  exposedHeaders: ['set-cookie'],
};

module.exports = {
  SECRET_KEY,
  MONGO_DB,
  PORT,
  CORS_OPTIONS,
};
