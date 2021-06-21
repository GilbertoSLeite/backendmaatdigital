const router = require('express').Router();

const CountriesControllers = require('../../controllers/countries/CountriesControllers');

module.exports = (app) => {
  router.get('/', CountriesControllers.Countries);

  // Criando a rota
  app.use('/maatdigital/paises', router);
};
