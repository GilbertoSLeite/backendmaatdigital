const jwt = require('jsonwebtoken');

const mySecret = 'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc=';

module.exports = function Validating(token) {
  const verify = jwt.verify(token, mySecret, (err, data) => (data ? true : (!err)));
  return verify;
};
