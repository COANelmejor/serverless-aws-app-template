const serverless = require('serverless-http');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors')
const path = require('path');

var uT = require('./lib/userTools');

var app = express();

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

var mongoose = require('mongoose');
var userDB = require('./models/userModel');

mongoose.connect('mongodb+srv://testmongo:01123581321@sandboxtestinganddevelop-vocxz.mongodb.net/dte?retryWrites=true&w=majority', {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection

passport.use(new Strategy(
  function (username, password, callback) {
    userDB.findOne({
      username: username.toLowerCase()
    }, function (err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
        return callback(null, false);
      } else if (!uT.checkPassword(password, user)) {
        return callback(null, false);
      } else {
        return callback(null, user);
      }
    });
  }));

passport.serializeUser(function (user, callback) {
  callback(null, user.id);
});

passport.deserializeUser(function (id, callback) {
  userDB.findById(id, "-password -salt", function (err, user) {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(session({
  secret: '01123581321',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes_api')(app)

app.post('/api/login',
  passport.authenticate('local', {
    failureRedirect: '/api/login/failure'
  }),
  function (req, res) {
    res.redirect('/api/login/success');
  }
);

app.get('/api/login/failure', function (req, res) {
  res.status(401).send({
    message: 'La combinación de correo y contraseña no coincide con ningún usuario.'
  })
})

app.get('/api/login/success', function (req, res) {
  res.status(200).send({
    message: 'Bienvenido.',
    user: req.user
  })
})

app.get('/api/logout', function (req, res, next) {
  req.logout();
  res.send({
    mmessage: 'Sesión cerrada con éxito.'
  })
});
app.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/')
});

require('./routes')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// app.use(function (err, req, res, next) {
//   // render the error page
//   res.status(err.status || 500).send(err);

// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports.app = serverless(app, {
  binary: ['*/*']
});
