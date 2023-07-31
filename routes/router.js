const router = require('express').Router();
const NOT_FOUND = require('../errors/NOT_FOUND');
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);
router.use('/*', auth, (req, res, next) => {
  next(new NOT_FOUND('Ошибка! Данные не найдены!'));
});

module.exports = router;
