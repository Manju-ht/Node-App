
const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const dotenv = require('dotenv').config()
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    done('', profile);
  }
));

passport.serializeUser((user, done)=>{
    done('', user);
})

passport.deserializeUser((user, done)=>{
    done('', user);
})