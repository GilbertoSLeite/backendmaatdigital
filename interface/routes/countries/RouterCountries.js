const router = require('express').Router();
const passport = require('passport');
require('../../../applications/security/Passport')(passport);

const CountriesControllers = require('../../controllers/countries/CountriesControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), CountriesControllers.Countries);

  // Criando a rota
  app.use('/maatdigital/paises', router);
};
