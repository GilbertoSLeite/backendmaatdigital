const router = require('express').Router();

const BooksAuthorControllers = require('../../controllers/books/booksControllersAuthors');

module.exports = (app) => {
  router.post('/', BooksAuthorControllers.PostAuthors);
  router.put('/:id', BooksAuthorControllers.PutAuthors);
  router.get('/', BooksAuthorControllers.GetAuthors);

  // Criando API
  app.use('/maatdigital/autores_livros', router);
};
