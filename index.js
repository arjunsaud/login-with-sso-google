const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
require('./googleAuth');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'anysecret' 
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  res.render('auth');
});

app.get('/success',(req,res)=>{
  res.render('profile',{user:req.user});
})
app.get('/error', (req, res) => res.send("error logging in"));

app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google',{ 
    failureRedirect: '/error',
    successRedirect: '/success',
   }));

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));