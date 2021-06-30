const router = require('express').Router();
const passport = require('passport');
require('../../../../../applications/security/Passport')(passport);

const SubClassesControllers = require('../../../../controllers/register/areaConhecimento/subClasses/subClassesControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), SubClassesControllers.GetBooksSubClasses);

  // Criando a rota
  app.use('/maatdigital/subclasses_conhecimento', router);
};
