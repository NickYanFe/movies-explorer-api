const router = require('express').Router();
const NOT_FOUND = require('../errors/NOT_FOUND');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/*', (req, res, next) => {
  next(new NOT_FOUND('Ошибка! Данные не найдены!'));
});

// router.use('/signin', login);
// router.use('/signup', createUser);

module.exports = router;
