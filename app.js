const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const logger = require('./server/logic/logger');
const login = require('./server/routes/login');
const uploader = require('./server/routes/uploader');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// morgan access log file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'data', 'log', 'access.log'),
  { flags: 'a' },
);
app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upmain', express.static(path.join(__dirname, 'public')));

// Upload Application Routing
app.use('/upload', (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});
app.use('/upload', uploader);

// Login Application Routing
app.use('/login', (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});
app.use('/login', login);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // logging
  logger.error('Error Response');
  logger.error(`err.status = ${err.status}`);
  logger.error(`err.message = ${err.message}`);

  const sts = err.status || 500;
  res.status(sts).json({
    status: sts,
    message: err.message,
  });
});

module.exports = app;
