const passport = require('passport');
require('dotenv').config()


const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID =process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET =process.env.GOOGLE_CLIENT_SECRET


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));
