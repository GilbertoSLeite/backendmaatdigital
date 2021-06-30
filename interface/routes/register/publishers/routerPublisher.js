const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const PublishersControllers = require('../../../controllers/register/publishers/publisherControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), PublishersControllers.GetPublishers);
  router.post('/', passport.authenticate('jwt', { session: false }), PublishersControllers.PostPublishers);
  router.put('/:id', passport.authenticate('jwt', { session: false }), PublishersControllers.PutPublishers);

  // Criando a rota
  app.use('/maatdigital/editoras', router);
};
