const router = require('express').Router();

const ChangePassWordsControllers = require('../../controllers/auth/changePasswordsControllers');

module.exports = (app) => {
  router.post('/', ChangePassWordsControllers.UsersChangePassword);

  // Criando API
  app.use('/maatdigital/changepassword', router);
};
