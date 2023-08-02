var createError = require('http-errors');
var express = require('express');
const session = require('express-session') 

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
require('./google-auth')
require('./facebook-auth')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{secure:false}
 }))
 
app.use(passport.initialize()) 
app.use(passport.session())

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));
app.get('/auth/facebook', 
passport.authenticate('facebook'));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/protected-google',
        failureRedirect: '/auth/failure'
}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/auth/protected-facebook',
    failureRedirect: '/auth/failure'
  }));

app.get('/auth/protected-google', isGoogleLoggedIn, (req, res)=>{
  var name = req.user;
  res.send(name)
})
app.get('/auth/protected-facebook', isFacebookLoggedIn, (req, res)=>{
  var name = req.user;
  res.send(name)
})

app.get('/auth/failure', (req, res)=>{
  res.send('Something went wrong!')
})

app.get('/auth/google/failure', (req, res)=>{ 
  res.send('Something went wrong!')
})

function isGoogleLoggedIn(req, res, next){ 
  req.user ? next() : res.sendStatus(401)
}

function isFacebookLoggedIn(req, res, next) { 
  req.user ? next() : res.sendStatus(401)
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/auth/logout',(req, res)=>{
  req.session.destroy(); 
  res.send('see you again !')
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app
};
