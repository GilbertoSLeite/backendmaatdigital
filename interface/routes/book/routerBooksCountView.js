const router = require('express').Router();

const BooksCountViewsControllers = require('../../controllers/books/BooksControllersCountViews');

module.exports = (app) => {
  router.post('/', BooksCountViewsControllers.PostCountViews);
  router.put('/:id', BooksCountViewsControllers.PutCountViews);
  router.get('/', BooksCountViewsControllers.GetCountViews);

  // Criando API
  app.use('/maatdigital/visualizacoes_livros', router);
};
