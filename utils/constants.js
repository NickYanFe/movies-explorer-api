const allowedCors = [
  'https://nickyanfediploma.nomoredomains.rocks',
  'http://nickyanfediploma.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost',
  'http://localhost:3001',
  'http://localhost:3001/movies',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://127.0.0.1:3000',
  'https://api.nomoreparties.co/beatfilm-movies',
  'http://api.nomoreparties.co/beatfilm-movies',
];
const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = {
  allowedCors,
  corsOptions,
};
