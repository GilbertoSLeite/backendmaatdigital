const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const GraduationsOrganizersBooksControllers = require('../../../controllers/register/organizers/graduationsOrganizersBooksControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), GraduationsOrganizersBooksControllers.GetGraduationsOrganizersBooks);
  router.post('/', passport.authenticate('jwt', { session: false }), GraduationsOrganizersBooksControllers.PostGraduationsOrganizersBooksBook);
  router.delete('/:organizador_id', passport.authenticate('jwt', { session: false }), GraduationsOrganizersBooksControllers.DelGraduationsOrganizersBooks);

  // Criando a rota
  app.use('/maatdigital/graduacao_organizadores', router);
};
