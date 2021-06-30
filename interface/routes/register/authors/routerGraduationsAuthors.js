const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const AuthorsGraduationsControllers = require('../../../controllers/register/author/authorBooksGraduationsControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), AuthorsGraduationsControllers.GetAuthorsGraduations);
  router.post('/', passport.authenticate('jwt', { session: false }), AuthorsGraduationsControllers.PostAuthorsGraduationsBook);
  router.delete('/:autores_id', passport.authenticate('jwt', { session: false }), AuthorsGraduationsControllers.DelAuthorsGraduations);

  // Criando a rota
  app.use('/maatdigital/graduacao_autores', router);
};
