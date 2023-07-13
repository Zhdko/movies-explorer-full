const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { limiter } = require('./middlewares/rateLimit');

const app = express();
const { routers } = require('./routers');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { MONGO_DB, PORT, CORS_OPTIONS } = require('./utils/config');

mongoose.connect(MONGO_DB, { useNewUrlParser: true });
app.use(cors(CORS_OPTIONS));

app.listen(PORT);

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);
app.use(routers);

app.use(errorLogger);
app.use(errorsHandler);
