const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const { checkPayload } = require('./utils');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/validate-rule');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/validate-rule', usersRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log(`:::::> Server listening on port ${process.env.PORT} || 3000`);
});
