module.exports = async function getToken(headers) {
    let sizeHeaders = JSON.stringify(headers).length
    let typeAuthorization = headers.authorization.split(' ')[1]
    try {
        return (((sizeHeaders > 0) && (typeAuthorization)) ? typeAuthorization : null)
    } catch (error) {
        console.log('Error em getToken: ' + error);
        return null;
    };
};