const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const DiagrammingControllers = require('../../../controllers/register/diagramming/graduationsDiagrammingsBooksControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), DiagrammingControllers.GetDiagrammingGraduations);
  router.post('/', passport.authenticate('jwt', { session: false }), DiagrammingControllers.PostDiagrammingGraduationsBook);
  router.delete('/:diagramador_id', passport.authenticate('jwt', { session: false }), DiagrammingControllers.DelDiagrammingGraduations);

  // Criando a rota
  app.use('/maatdigital/graduacao_diagramadores', router);
};
