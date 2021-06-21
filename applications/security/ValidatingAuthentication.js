const jwt = require('jsonwebtoken');

const mySecret = 'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc=';

const Validating = (token) => jwt.verify(token, mySecret, (err, data) => (data ? true : (!err)));

module.exports = {
  Validating,
};
