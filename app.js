require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

const router = require('./routes/router');
const { createUser, login } = require('./controllers/users');
const {
  validationCreateUser,
  validationLogin,
} = require('./middlewares/validations');
const handleErrors = require('./middlewares/handleErrors');

const { baseMongoUrl = 'mongodb://127.0.0.1:27017/bitfilmsdb', PORT = 3000 } = process.env;
const auth = require('./middlewares/auth');

const app = express();
app.use(cors());

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(express.json());
app.use(helmet());

app.use(requestLogger); // подключаем логгер запросов

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use(auth);

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

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
