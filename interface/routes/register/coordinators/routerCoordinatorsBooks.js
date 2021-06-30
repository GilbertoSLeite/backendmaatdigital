const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const CoordinatorsControllers = require('../../../controllers/register/coordinator/coordinatorsBooksControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), CoordinatorsControllers.GetCoordinators);
  router.post('/', passport.authenticate('jwt', { session: false }), CoordinatorsControllers.PostCoordinatorsBook);
  router.put('/:id', passport.authenticate('jwt', { session: false }), CoordinatorsControllers.PutCoordinators);

  // Criando a rota
  app.use('/maatdigital/coordenadores', router);
};
