#!/usr/bin/env node

/**
 * Module dependencies.
 */
const debug = require('debug')('bemaatdigital:server');
const http = require('http');
const app = require('../app');

const server = http.createServer(app);

function normalizePort(val) {
  const port = parseInt(val, 10);
  const namedPipe = (Number.isNaN(port) && val);
  const namedPort = ((port >= 0) && port);
  return (!namedPipe ? namedPort : namedPipe);
}

const port = normalizePort(process.env.PORT || '6001');

app.set('port', port);

const pipeOrPort = {
  true: `Pipe ${port}`,
  false: `Port ${port}`,
};
const errorCode = {
  EACCES: `${pipeOrPort[typeof port === 'string']} requer privilégios.`,
  EADDRINUSE: `${pipeOrPort[typeof port === 'string']} já se encontra em uso.`,
};

function onError(error) {
  const messageError = (error.syscall !== 'listen') ? error : errorCode[error.code];
  // eslint-disable-next-line no-console
  console.log(messageError);
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
