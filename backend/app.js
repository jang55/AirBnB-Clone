const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');const { environment } = require('./config');
const isProduction = environment === 'production';
const routes = require('./routes');
const { ValidationError } = require('sequelize');
const cron = require("node-cron")

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
  
  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  // this is cron jobs to do something to keep the project active
  // starts as min/ hour/ month/ day of the week
  cron.schedule("*/3 * * * *", () => {
    console.log("Hello Cron")
  })

  app.use(routes); 

  //dont edit anything above this line
  /*********************************************************************************************************************************************/










  /******************************** ERROR HANDLINGS ********************************************************************************************/

// Resrouces not found error handler
  app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });

//Sequelize error handler
  app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    next(err);
  });

//Formatting error handler
  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    if (isProduction) delete err.stack;
    res.json({
      // title: err.title || 'Server Error',
      message: err.message,
      statusCode: err.status,
      errors: err.errors,
      stack: err.stack
    });
  });

  /********************** EXPORTINGS *******************************************************************************************************/
  //dont edit under this line

  module.exports = app;