const router = require('express').Router();

const BooksCoordinatorsControllers = require('../../controllers/books/booksControllersCoordinators');

module.exports = (app) => {
  router.post('/', BooksCoordinatorsControllers.PostCoordinators);
  router.put('/:id', BooksCoordinatorsControllers.PutCoordinators);
  router.get('/', BooksCoordinatorsControllers.GetCoordinators);

  // Criando API
  app.use('/maatdigital/coordenadores_livros', router);
};
