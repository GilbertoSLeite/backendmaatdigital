const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const CoordinatorsControllers = require('../../../controllers/register/coordinator/coordinatorsBooksGraduationsControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), CoordinatorsControllers.GetCoordinatorsGraduations);
  router.post('/', passport.authenticate('jwt', { session: false }), CoordinatorsControllers.PostCoordinatorsGraduationsBook);
  router.delete('/:coordenadores_id', passport.authenticate('jwt', { session: false }), CoordinatorsControllers.DelCoordinatorsGraduations);

  // Criando a rota
  app.use('/maatdigital/graduacao_coordenadores', router);
};
