const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, sequelize, Review, Image } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/***************** Validations *********************************/

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

/****************** Routes ******************************/

// Sign up
router.post('/signup', validateSignup, async (req, res, next) => {
      const { email, password, username, firstName, lastName } = req.body;
      const hashedPassword = bcrypt.hashSync(password);

  // Check if Username or Email exists
      const existedUsername = await User.findOne({ 
          where: {
            username: username
          } 
        });
      const existedEmail = await User.findOne({ 
        where: {
          email: email
        } 
      });

      if(existedUsername){
        const err = new Error("User already exists");
        err.title = "Bad request.";
        err.errors = ["User with that username already exists"];
        err.status = 403;
        next(err);
      } 
      if(existedEmail) {
        const err = new Error("User already exists");
        err.title = "Bad request.";
        err.errors = ["User with that email already exists"];
        err.status = 403;
        next(err);
      } 

  //creates the new user if info are all valid
      const user = await User.create({ email, username, hashedPassword, firstName, lastName });
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
  
      const token = await setTokenCookie(res, safeUser);
      safeUser.token = token;
  
      res.status(200)
      return res.json({
        user: safeUser
      });
    }
  );

  /*****/

  // Log in
router.post('/login', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential
      }
    }
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    err.title = 'Login failed';
    err.errors = { credential: 'The provided credentials were invalid.' };
    return next(err);
  }

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

    const token = await setTokenCookie(res, safeUser);
    safeUser.token = token;

    return res.json({
      user: safeUser
    });
  }
);

/*****/

//get all spots owned by the current user
router.get("/currentUser/locations", requireAuth, async (req, res, next) => {
  const { user } = req;
  const userId = +user.id;

  const allSpots = await Spot.findAll({
    where: {
      ownerId: userId
    },
    attributes: {
        include:[
            [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],

        ] 
    },
    include:[
        {
            model: Review,
            attributes: []
        },
        {
            model: Image,
            as: "previewImage",
            where: { preview: true },
            attributes: ["url"],
            required: false,
        },
    ],
    group: "Spot.id"
        
  });

  const spots = []

  for(let i = 0; i < allSpots.length; i++) {
      let spot = allSpots[i].toJSON();
      spot.previewImage = spot.previewImage[0]?.url || null;
      spots.push(spot)
  }

  res.json({
      spots: spots
  });
})

/*****/

// get the current user
router.get('/currentUser', (req, res) => {
  const { user } = req;
  if (user && requireAuth) {
    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
    };
    return res.json({
      user: safeUser
    });
  } else return res.json({ user: null });
}
);





/****************** EXPORT ********************************/
module.exports = router;