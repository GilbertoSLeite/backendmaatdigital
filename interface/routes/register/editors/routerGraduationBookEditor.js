const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const GraduationsBookEditorControllers = require('../../../controllers/register/editor/graduationBookEditorControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), GraduationsBookEditorControllers.GetBookEditorGraduations);
  router.post('/', passport.authenticate('jwt', { session: false }), GraduationsBookEditorControllers.PostBookEditorGraduationsBook);
  router.delete('/:editor_id', passport.authenticate('jwt', { session: false }), GraduationsBookEditorControllers.DelBookEditorGraduations);

  // Criando a rota
  app.use('/maatdigital/graduacao_editores', router);
};
