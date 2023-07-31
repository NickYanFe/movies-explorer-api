require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/rateLimiter');

const router = require('./routes/router');
const { createUser, login } = require('./controllers/users');

const { corsOptions } = require('./utils/constants');

const {
  validationCreateUser,
  validationLogin,
} = require('./middlewares/validations');
const handleErrors = require('./middlewares/handleErrors');

const { baseMongoUrl } = require('./utils/config');
const auth = require('./middlewares/auth');

const { PORT = 3001 } = process.env;
const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());

app.use(requestLogger);
app.use(limiter);

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

async function start() {
  try {
    await mongoose.connect(baseMongoUrl);
    await app.listen(PORT);
    await console.log(`app listening on port${PORT}`);
  } catch (err) {
    console.log(err);
  }
}

start().then(() => console.log(`Приложение успешно запущенно!\n${baseMongoUrl}\nPort: ${PORT}`));
