const router = require('express').Router();

const BooksOrganizersControllers = require('../../controllers/books/BooksControllersOrganizers');

module.exports = (app) => {
  router.post('/', BooksOrganizersControllers.PostOrganizers);
  router.put('/:id', BooksOrganizersControllers.PutOrganizers);
  router.get('/', BooksOrganizersControllers.GetOrganizers);

  // Criando API
  app.use('/maatdigital/organizadores_livros', router);
};
