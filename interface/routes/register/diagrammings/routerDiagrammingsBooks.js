const router = require('express').Router();
const passport = require('passport');
require('../../../../applications/security/Passport')(passport);

const DiagrammingControllers = require('../../../controllers/register/diagramming/diagrammingsBooksControllers');

module.exports = (app) => {
  router.get('/', passport.authenticate('jwt', { session: false }), DiagrammingControllers.GetDiagrammingBook);
  router.post('/', passport.authenticate('jwt', { session: false }), DiagrammingControllers.PostDiagrammingBook);
  router.put('/:id', passport.authenticate('jwt', { session: false }), DiagrammingControllers.PutDiagrammingBook);

  // Criando a rota
  app.use('/maatdigital/diagramadores', router);
};
