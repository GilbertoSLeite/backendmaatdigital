const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const Users = require('../model').usuarios;

module.exports = function (passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: 'nodeauthsecret',
    };
    passport.use('jwt', new JwtStrategy(opts, function (jwt_payload, done) {
        Users
            .findByPk(jwt_payload.id)
            .then((user) => {
                return done(null, user);
            })
            .catch((error) => {
                console.log('Error: ' + error);
                return done(error, false);
            });
    }));
};