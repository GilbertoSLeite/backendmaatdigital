const router = require('express').Router();

const BooksCoversControllers = require('../../controllers/books/BooksControllersCovers');

module.exports = (app) => {
  router.post('/', BooksCoversControllers.PostCovers);
  router.put('/:id', BooksCoversControllers.PutCovers);
  router.get('/', BooksCoversControllers.GetCovers);

  // Criando API
  app.use('/maatdigital/capas_livros', router);
};
