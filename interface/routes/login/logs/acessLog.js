const router = require('express').Router();

const AcessLogsControllers = require('../../../controllers/login/logs/acessLogControllers');

module.exports = (app) => {
  router.post('/', AcessLogsControllers.PostAcessLog);
  router.get('/', AcessLogsControllers.GetAcessLog);

  // Criando API
  app.use('/maatdigital/logs_logins', router);
};
