const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const BookEditorControllers = require('../../../controllers/register/editor/bookEditorControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), BookEditorControllers.GetBookEditor);
  router.post('/', passport.authenticate('jwt', { session: false }), BookEditorControllers.PostBookEditor);
  router.put('/:id', passport.authenticate('jwt', { session: false }), BookEditorControllers.PutBookEditor);

  // Criando a rota
  app.use('/maatdigital/editores', router);
};
