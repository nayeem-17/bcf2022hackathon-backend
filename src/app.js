const createError = require('http-errors');
const express = require('express');

const cors = require('cors')

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet')
require('dotenv').config()

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const limiter = require('./services/rateLimiter');
const adminRouter = require('./routes/admin');

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use(limiter)

app.use('/', indexRouter);
app.use('/api/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
