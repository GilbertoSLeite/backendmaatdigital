const router = require('express').Router();

const LoginControllers = require('../../controllers/auth/LoginControllers');

module.exports = (app) => {
  router.post('/', LoginControllers.Users);

  // Criando API
  app.use('/maatdigital/login', router);
};
