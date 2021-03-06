var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); // for html submit forms
var logger = require('morgan');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var dashboardRouter = require('./routes/dashboard');

// create express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'pages', 'dashboard')));
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
});

// routers
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);

// routes for specific pages
// app.get('/learning', function (req, res, next) {
//   res.sendFile(path.join(__dirname, 'public', 'pages', 'learning.html'));
// });
// app.get('/services', function (req, res, next) {
//   res.sendFile(path.join(__dirname, 'public', 'pages', 'services.html'));
// });

// app.get('/about/why', function (req, res, next) {
//   res.sendFile(path.join(__dirname, 'public', 'pages', 'about', 'why.html'));
// });
// app.get('/about/faqs', function (req, res, next) {
//   res.sendFile(path.join(__dirname, 'public', 'pages', 'about', 'faqs.html'));
// });
// app.get('/about/contact', function (req, res, next) {
//   res.sendFile(path.join(__dirname, 'public', 'pages', 'about', 'contact.html'));
// });
// app.get('/about/testimonials', function (req, res, next) {
//   res.sendFile(path.join(__dirname, 'public', 'pages', 'about', 'testimonials.html'));
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
