module.exports = async function getToken(headers) {
  const sizeHeaders = JSON.stringify(headers).length;
  const typeAuthorization = headers.authorization.split(' ')[1];
  try {
    return (((sizeHeaders > 0) && (typeAuthorization)) && typeAuthorization);
  } catch (error) {
    return Error(error);
  }
};
