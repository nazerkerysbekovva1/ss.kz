const passport = require('passport')
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require('./User')

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'skillsync24', 
};

passport.use(new JWTStrategy(jwtOptions, async(jwtPayload, done) => {
  // Perform user verification in the database or any other data source
  // Call the 'done' function with an argument indicating the authentication result
  // done(null, user) - successful authentication
  // done(null, false) - unsuccessful authentication

  const user = await User.findByPk(jwtPayload.id)
  if(user) done(null, user)
  else done(null, false)
}));

module.exports = {
  jwtOptions
}