const { validationResult } = require('express-validator');


// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) { 
  //auth me error format
    // const errors = {};
    // validationErrors
    //   .array()
    //   .forEach(error => errors[error.param] = error.msg);

  //my error format
    const errors = []
    validationErrors
    .array()
    .forEach(error => {
      if(error.msg !== "Invalid value") {
        errors.push(error.msg)
      }
    });

    const err = Error("Validation error");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};







/******************* EXPORT *********************************/
module.exports = {
  handleValidationErrors
};