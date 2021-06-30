const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const CoversControllers = require('../../../controllers/register/cover/booksGraduationsCoversControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), CoversControllers.GetCoversGraduations);
  router.post('/', passport.authenticate('jwt', { session: false }), CoversControllers.PostCoversGraduationsBook);
  router.delete('/:capas_id', passport.authenticate('jwt', { session: false }), CoversControllers.DelCoversGraduations);

  // Criando a rota
  app.use('/maatdigital/graduacao_resp_capas', router);
};
