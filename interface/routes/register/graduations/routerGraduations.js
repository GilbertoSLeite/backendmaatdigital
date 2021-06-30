const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const GraduationsControllers = require('../../../controllers/register/graduations/graduationsControlles');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), GraduationsControllers.GetGraduations);
  router.post('/', passport.authenticate('jwt', { session: false }), GraduationsControllers.PostGraduations);
  router.put('/:id', passport.authenticate('jwt', { session: false }), GraduationsControllers.PutGraduations);

  // Criando a rota
  app.use('/maatdigital/graduacao', router);
};
