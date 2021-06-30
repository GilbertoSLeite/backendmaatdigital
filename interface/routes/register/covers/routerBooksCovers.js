const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const CoversControllers = require('../../../controllers/register/cover/booksCoversControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), CoversControllers.GetCoversBook);
  router.post('/', passport.authenticate('jwt', { session: false }), CoversControllers.PostCoversBook);
  router.put('/:id', passport.authenticate('jwt', { session: false }), CoversControllers.PutCoversBook);

  // Criando a rota
  app.use('/maatdigital/resp_capas', router);
};
