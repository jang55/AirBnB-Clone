const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const validator = require("validator");

/*************************** Err Handling for validations **********************************/

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    //auth me error format
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.param] = error.msg));

    //my error format
    // const errors = []
    // validationErrors
    // .array()
    // .forEach(error => {
    //   if(!(error.msg === "Invalid value" || errors.includes(error.msg))) {
    //     errors.push(error.msg)
    //   }
    // });

    const err = Error("Validation Error");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

/*********************** Validations ******************************/

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .isAlpha()
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .isAlpha()
    .withMessage("Last Name is required"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Username can not use special characters")
    .isLength({ min: 4 })
    .withMessage("Username is required with atleast 4 characters"),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

/*********/

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

/*********/

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .matches(/^[a-zA-Z0-9 .]+$/)
    .custom((value) => {
      if (value) {
        const dateArr = value.split(" ");
        if (dateArr.length < 2) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    })
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .notEmpty()
    .matches(/^[a-zA-Z ]+$/)
    .isLength({ min: 2 })
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .notEmpty()
    .matches(/^[a-zA-Z ]+$/)
    .isLength({ min: 2 })
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .notEmpty()
    .matches(/^[a-zA-Z ]+$/)
    .isLength({ min: 2 })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude is not valid"),
  check("name")
    .isLength({ max: 100 })
    .withMessage("Name must be less than 100 characters")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("Name must be only alphabetic")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Name is required"),
  check("description")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ min: 30 })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat()
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

/*********/

const validateImage = [
  check("url")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isURL()
    .withMessage("URL is required")
    .custom((imgURL) => {
    //valid url endings;
      const imgEndings = ["png", "jpg", "jpeg"];
    //splits it by a period to get an array of the string
      const imgURLSplit = imgURL.split(".");
    //if not nothing is in the url return it
      if (!imgURL) {
        return true;
      }
    //if url is given and ending is not valid, place an error for the image
      if (!imgEndings.includes(imgURLSplit[imgURLSplit.length - 1])) {
        return false;
      }
    //return if all is well
      return true;
    })
    .withMessage("Image URL's must end in .png, .jpg, or.jpeg"),
  check("preview")
    .exists()
    .notEmpty()
    .isBoolean()
    .withMessage("Preview is required with true or false"),
  handleValidationErrors,
];

/*********/

const validateImageUrl = [
  check("url")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isURL()
    .withMessage("URL is required")    
    .custom((imgURL) => {
      //valid url endings;
        const imgEndings = ["png", "jpg", "jpeg"];
      //splits it by a period to get an array of the string
        const imgURLSplit = imgURL.split(".");
      //if not nothing is in the url return it
        if (!imgURL) {
          return true;
        }
      //if url is given and ending is not valid, place an error for the image
        if (!imgEndings.includes(imgURLSplit[imgURLSplit.length - 1])) {
          return false;
        }
      //return if all is well
        return true;
      })
      .withMessage("Image URL's must end in .png, .jpg, or.jpeg"),
  handleValidationErrors,
];

/*********/

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isNumeric()
    .isIn([1, 2, 3, 4, 5])
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

/*********/

const validateBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .notEmpty()
    .custom((value) => {
      if (value) {
        if (typeof value !== "string") {
          return false;
        }

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
      if (typeof value !== "string") {
        return false;
      }

      const dateArr = value.split("-");
      if (dateArr[0].length !== 4) {
        return false;
      } else if (dateArr[1].length !== 2 || dateArr[2].length !== 2) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage(`Start date is required in format YYYY-MM-DD .ie 2000-01-25`)
    .custom((value, { req }) => {
      const date = new Date();
      return new Date(value) > date;
    })
    .withMessage("Start date must be in the future"),
  check("endDate")
    .exists({ checkFalsy: true })
    .notEmpty()
    .custom((value) => {
      if (value) {
        if (typeof value !== "string") {
          return false;
        }

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
      if (typeof value !== "string") {
        return false;
      }
      const dateArr = value.split("-");
      if (dateArr[0].length !== 4) {
        return false;
      } else if (dateArr[1].length !== 2 || dateArr[2].length !== 2) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage(`End date is required in format YYYY-MM-DD .ie 2000-01-25`)
    .custom((value, { req }) => {
      return value > req.body.startDate;
    })
    .withMessage("endDate cannot be on or before startDate"),
  handleValidationErrors,
];

/******************* EXPORT *********************************/
module.exports = {
  handleValidationErrors,
  validateSpot,
  validateImage,
  validateReview,
  validateBooking,
  validateSignup,
  validateLogin,
  validateImageUrl,
};
