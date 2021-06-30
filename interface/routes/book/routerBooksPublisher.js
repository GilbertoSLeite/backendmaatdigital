const router = require('express').Router();

const BooksPublisherControllers = require('../../controllers/books/BooksControllersPublisher');

module.exports = (app) => {
  router.post('/', BooksPublisherControllers.PostPublisher);
  router.put('/:id', BooksPublisherControllers.PutPublisher);
  router.get('/', BooksPublisherControllers.GetPublisher);

  // Criando API
  app.use('/maatdigital/editoras_livros', router);
};
