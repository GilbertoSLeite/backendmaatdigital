const router = require('express').Router();
const passport = require('passport');
require('../../../../../applications/security/Passport')(passport);

const MainClasses = require('../../../../controllers/register/areaConhecimento/mainClasses/mainClassesControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), MainClasses.GetBooksMainClasses);

  // Criando a rota
  app.use('/maatdigital/areaconhecimento', router);
};
