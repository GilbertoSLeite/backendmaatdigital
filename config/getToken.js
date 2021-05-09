module.exports = async function getToken(headers) {
    try {
        if ((headers) && (headers.authorization)) {
            let parted = await headers.authorization.split(' ');
            return parted.length === 2 ? parted[1] : null;
        } else {
            return null;
        };
    } catch (error) {
        console.log('Error em getToken: ' + error);
        return null;
    };
};