const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

// load up the user model
const Users = require('../database').usuarios;

export default async function Passport(passport) {
  try {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: 'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc=',
    };
    passport.use('jwt', new JwtStrategy(opts, (async (jwtPayload, done) => {
      try {
        const userSearch = Users.findByPk(jwtPayload.data.id);
        const resultUserSearch = await userSearch;
        return resultUserSearch ? done(null, userSearch) : done(null, false);
      } catch (error) {
        return error;
      }
    })));
  } catch (error) {
    return error;
  }
}
