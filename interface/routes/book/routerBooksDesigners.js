const router = require('express').Router();

const BooksDesignersControllers = require('../../controllers/books/BooksControllersDesigners');

module.exports = (app) => {
  router.post('/', BooksDesignersControllers.PostDesigners);
  router.put('/:id', BooksDesignersControllers.PutDesigners);
  router.get('/', BooksDesignersControllers.GetDesigners);

  // Criando API
  app.use('/maatdigital/diagramadores_livros', router);
};
