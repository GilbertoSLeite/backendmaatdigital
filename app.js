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
/* Rotas
require('./interface/routes/login/logs/logs_acesso')(app);
require('./interface/routes/login/user/router_users')(app);
require('./interface/routes/login/user/router_users_id')(app);
require('./interface/routes/Auth/endpoint_autenticacao')(app);
require('./interface/routes/Auth/endpoit_changePassword')(app);
require('./interface/routes/countries/router_countries')(app);
require('./interface/routes/register/author/router_bookAuthor')(app);
require('./interface/routes/register/author/router_graduationsAuthor')(app);
require('./interface/routes/register/coordinator/router_coordinatorBook')(app);
require('./interface/routes/register/coordinator/router_graduationsCoordinator')(app);
require('./interface/routes/register/cover/router_bookCover')(app);
require('./interface/routes/register/cover/router_graduationsCover')(app);
require('./interface/routes/register/ddc/mainClasses/router_mainclasses')(app);
require('./interface/routes/register/ddc/subclasses/router_subclasses')(app);
require('./interface/routes/register/diagramming/router_diagrammingBook')(app);
require('./interface/routes/register/diagramming/router_graduationsDiagramming')(app);
require('./interface/routes/register/editor/router_responsibleEditor')(app);
require('./interface/routes/register/editor/router_graduations_responsibleEditor')(app);
require('./interface/routes/register/graduation/router_graduation')(app);
require('./interface/routes/register/organizer/router_OrganizerBook')(app);
require('./interface/routes/register/organizer/router_graduationsOrganizerBook')(app);
require('./interface/routes/register/publisher/router_publisher')(app);
require('./interface/routes/book/router_book')(app);
require('./interface/routes/book/router_bookAuthors')(app);
require('./interface/routes/book/router_bookCountView')(app);
require('./interface/routes/book/router_bookCountDown')(app);
require('./interface/routes/book/router_bookCovers')(app);
require('./interface/routes/book/router_bookRespCovers')(app);
require('./interface/routes/book/router_bookDesigners')(app);
require('./interface/routes/book/router_bookPublisher')(app);
require('./interface/routes/book/router_coordinatorsBook')(app);
require('./interface/routes/book/router_organizersBook')(app);
require('./interface/routes/book/router_responsibleEditorsBook')(app); */

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
