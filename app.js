const session = require('express-session');
const cors = require('cors');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');

const db = require('./infrastructure/database/index');

db.sequelize.sync();

const app = express();

const corsOptions = {
  origin: '*',
  methods: 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT',
  allowedHeaders: 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
};

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(cookieParser());

// Home Page
app.get('/', (req, res) => {
  res.json({
    message: 'Seja bem vindo ao projeto de Biblioteca Digital MAAT Digital.',
  });
});

// Analisar Cors do Navegador
app.use(cors(corsOptions));

app.use(session({
  secret: 'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc=',
  cookie: {
    maxAge: 60000,
  },
  resave: false,
  saveUninitialized: false,
}));

require('./interface/routes/auth/RouterLogin')(app);
require('./interface/routes/countries/RouterCountries')(app);
require('./interface/routes/login/logs/acessLog')(app);
require('./interface/routes/book/routerBook')(app);
require('./interface/routes/book/routerBooksAuthors')(app);
require('./interface/routes/book/routerBooksCoordinators')(app);
require('./interface/routes/book/routerBooksCountDownload')(app);
require('./interface/routes/book/routerBooksCountView')(app);
require('./interface/routes/book/routerBooksCovers')(app);
require('./interface/routes/book/routerBooksDesigners')(app);
require('./interface/routes/book/routerBooksOrganizers')(app);
require('./interface/routes/book/routerBooksPublisher')(app);
require('./interface/routes/book/routerBooksRespCovers')(app);
require('./interface/routes/book/routerBooksResponsibleEditors')(app);
require('./interface/routes/register/areasConhecimentos/mainClasses/routerMainClasses')(app);
require('./interface/routes/register/areasConhecimentos/subclasses/routerSubClasses')(app);
require('./interface/routes/register/authors/routerBookAuthors')(app);
require('./interface/routes/register/authors/routerGraduationsAuthors')(app);
require('./interface/routes/register/coordinators/routerCoordinatorsBooks')(app);
require('./interface/routes/register/coordinators/routerGraduationsCoordinatos')(app);
require('./interface/routes/register/covers/routerBooksCovers')(app);
require('./interface/routes/register/covers/routerBooksGraduationsCovers')(app);
require('./interface/routes/register/diagrammings/routerDiagrammingsBooks')(app);
require('./interface/routes/register/diagrammings/routerGraduationsDiagrammingsBooks')(app);
require('./interface/routes/register/editors/routerBookEditor')(app);
require('./interface/routes/register/editors/routerGraduationBookEditor')(app);
require('./interface/routes/register/graduations/routerGraduations')(app);
require('./interface/routes/register/organizers/routerOrganizersBooks')(app);
require('./interface/routes/register/organizers/routerGraduationsOrganizersBooks')(app);
require('./interface/routes/register/publishers/routerPublisher')(app);

// catch 404 and forward to error handler
function ErroStatus(req, res, next) {
  return (((res.statusCode >= 400) && (res.statusCode <= 511))
  && next(createError(res.statusCode)));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : next(err);
  // render the error page
  res.status(err.status || 500);
}

// error handler
app.use(errorHandler);

// catch 404 and forward to error handler
app.use(ErroStatus);

module.exports = app;
