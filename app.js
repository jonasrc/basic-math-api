const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const statusCodes = require('http-status-codes');

const appIndex = require('./routes/index');
const errorMessages = require('./errors/messages');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', appIndex);

app.use(function(req, res, next) {
  res.status(statusCodes.NOT_FOUND).json({'error': errorMessages.routeNotFound});
});

app.use(function(err, req, res, next) {
  const statusIsUndefined = typeof err.status === 'undefined';
  const errorStatus = statusIsUndefined ? statusCodes.INTERNAL_SERVER_ERROR : err.status;
  const errorMessage = statusIsUndefined ? errorMessages.internalServerError : err.message;
  res.status(errorStatus).send({'error': errorMessage});
});

module.exports = app;
