const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const OrganizersBooksControllers = require('../../../controllers/register/organizers/organizersBooksControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), OrganizersBooksControllers.GetOrganizersBooks);
  router.post('/', passport.authenticate('jwt', { session: false }), OrganizersBooksControllers.PostOrganizersBooks);
  router.put('/:id', passport.authenticate('jwt', { session: false }), OrganizersBooksControllers.PutOrganizersBooks);

  // Criando a rota
  app.use('/maatdigital/organizadores', router);
};
