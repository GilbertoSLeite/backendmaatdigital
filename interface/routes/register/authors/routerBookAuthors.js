const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const AuthorsControllers = require('../../../controllers/register/author/authorBooksControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), AuthorsControllers.GetAuthor);
  router.post('/', passport.authenticate('jwt', { session: false }), AuthorsControllers.PostAuthorBook);
  router.put('/:id', passport.authenticate('jwt', { session: false }), AuthorsControllers.PutAuthor);

  // Criando a rota
  app.use('/maatdigital/autores', router);
};
