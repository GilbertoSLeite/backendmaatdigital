const router = require('express').Router();

const BooksControllers = require('../../controllers/books/booksControllers');

module.exports = (app) => {
  router.post('/', BooksControllers.BookPost);
  router.put('/:id', BooksControllers.BookPut);
  router.get('/', BooksControllers.BookGet);

  // Criando API
  app.use('/maatdigital/livros', router);
};
