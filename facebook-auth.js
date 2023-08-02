const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require('dotenv').config()

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
}, 
  function (request, accessToken, refreshToken, profile, done) { 
    return done('', profile);
  }
));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
