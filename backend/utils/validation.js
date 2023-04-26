const { validationResult } = require('express-validator');
const { check } = require('express-validator');




/*************************** Err Handling for validations **********************************/


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











/*********************** Validations ******************************/

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .isAlpha()
    .withMessage("First Name is required"),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .isAlpha()
    .withMessage("Last Name is required"),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Username is required"),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


/*********/


const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required"),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors
];


/*********/


const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Street address is required"),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("City is required"),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("State is required"),
  check('country')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Country is required"),
  check('lat')
    .exists({ checkFalsy: true })
    .isDecimal()
    .notEmpty()
    .withMessage("Latitude is not valid"),
  check('lng')
    .exists({ checkFalsy: true })
    .isDecimal()
    .notEmpty()
    .withMessage("Longitude is not valid"),
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name must be less than 100 characters"),
  check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Description is required"),
  check('price')
    .exists({ checkFalsy: true })
    .isNumeric()
    .notEmpty()
    .withMessage("Price per day is required"),
  handleValidationErrors
];


/*********/


const validateImage = [
  check('url')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isURL()
    .withMessage("URL is required"),
  check('preview')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Preview is required with true or false"),
  handleValidationErrors
];


/*********/


const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
  check('stars')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isNumeric()
    .isIn([1,2,3,4,5])
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
];


/*********/


const validateBooking = [
  check('startDate')
      .exists({ checkFalsy: true })
      .notEmpty()
      .custom((value) => {
        if(value) {
          const dateArr = value.split("-");
          if (dateArr.length !== 3) {
              return false;
          } else {
              return true;
          }
        }
        return false;
    })
      .custom((value) => {
          const dateArr = value.split("-");
          if(dateArr[0].length !== 4) {
              return false;
          } else if(dateArr[1].length !== 2 || dateArr[2].length !== 2) {
              return false;
          } else {
              return true;
          }
      })
      .withMessage(`Start date is required in format YYYY-MM-DD .ie 2000-01-25`)
      .custom((value, {req}) => {
          const date = new Date()
          return new Date(value) > date
      })
      .withMessage('Start date must be in the future'),
  check('endDate')
      .exists({ checkFalsy: true })
      .notEmpty()
      .custom((value) => {
          if(value) {
            const dateArr = value.split("-");
            if (dateArr.length !== 3) {
                return false
            } else {
                return true
            }
          }
          return false
      })
      .custom((value) => {
          const dateArr = value.split("-");
          if(dateArr[0].length !== 4) {
              return false;
          } else if(dateArr[1].length !== 2 || dateArr[2].length !== 2) {
              return false;
          } else {
              return true;
          }
      })
      .withMessage(`End date is required in format YYYY-MM-DD .ie 2000-01-25`)
      .custom((value, {req}) => {
          return value > req.body.startDate
      })
      .withMessage("endDate cannot be on or before startDate"),
  handleValidationErrors
]







/******************* EXPORT *********************************/
module.exports = {
  handleValidationErrors,
  validateSpot,
  validateImage,
  validateReview,
  validateBooking,
  validateSignup,
  validateLogin
};