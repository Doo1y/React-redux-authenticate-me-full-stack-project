/* eslint-disable no-unused-vars */
const express = require('express'),
  morgan = require('morgan'),
  cors = require('cors'),
  csurf = require('csurf'),
  helmet = require('helmet'),
  cookieParser = require('cookie-parser');

const routes = require('./routes');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  app.use(cors());
}

app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
  })
);

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true
    }
  })
);

app.use(routes); // Connect all the routes

module.exports = app;
