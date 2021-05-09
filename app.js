
const http = require('http');
let express = require('express');
const session = require('express-session');
const cors = require("cors");

let createError = require('http-errors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();
let db = require('./model/index');
db.sequelize.sync();

let corsOptions = {
    origin: '*',
    methods: 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT',
    allowedHeaders: 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Home Page
app.get("/", (req, res) => {
    res.json({
        message: "Seja bem vindo ao projeto de Biblioteca Digital MAAT Digital."
    });
});

//Analisar Cors do Navegador
app.use(cors(corsOptions));

app.use(session({
    secret: 'endpoint_autenticacao',
    cookie: { 
        maxAge: 60000 
        },
    resave: false,
    saveUninitialized: false
}));

//Rotas 
require('./routes/login/logs/logs_acesso')(app);
require('./routes/login/user/router_users')(app);
require('./routes/login/user/router_users_id')(app);
require('./routes/Auth/endpoint_autenticacao')(app);
require('./routes/Auth/endpoit_changePassword')(app);
require('./routes/countries/router_countries')(app);
require('./routes/register/author/router_bookAuthor')(app);
require('./routes/register/author/router_graduationsAuthor')(app);
require('./routes/register/coordinator/router_coordinatorBook')(app);
require('./routes/register/coordinator/router_graduationsCoordinator')(app);
require('./routes/register/cover/router_bookCover')(app);
require('./routes/register/cover/router_graduationsCover')(app);
require('./routes/register/ddc/mainClasses/router_mainclasses')(app);
require('./routes/register/ddc/subclasses/router_subclasses')(app);
require('./routes/register/diagramming/router_diagrammingBook')(app);
require('./routes/register/diagramming/router_graduationsDiagramming')(app);
require('./routes/register/editor/router_responsibleEditor')(app);
require('./routes/register/editor/router_graduations_responsibleEditor')(app);
require('./routes/register/graduation/router_graduation')(app);
require('./routes/register/organizer/router_OrganizerBook')(app);
require('./routes/register/organizer/router_graduationsOrganizerBook')(app);
require('./routes/register/publisher/router_publisher')(app);

// catch 404 and forward to error handler
function ErroStatus(req, res, next) {
    if ((res.statusCode >= 400) && (res.statusCode <= 511)) {
        return next(createError(res.statusCode));
    };
};

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(ErroStatus);

module.exports = app;