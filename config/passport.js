const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const Users = require('../model').usuarios;

module.exports = async function (passport) {
    try {
        const opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
            secretOrKey: 'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc=',
        }
        passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
            try {
                const userSearch = Users.findByPk(jwt_payload.data.id)
                const resultUserSearch = await userSearch
                return resultUserSearch ? done(null, userSearch) : done(error, false) || console.log('Error: ', error)                
            } catch (error) {
                console.log('Error em JwtStrategy - Passport ', error)                
            }            
        }))    
    } catch (error) {
        console.log('Error em Passport ', error)
    };
};