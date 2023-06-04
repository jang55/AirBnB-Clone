const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, sequelize, Review, Image, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors,
  validateSpot,
  validateImage,
  validateBooking,
  validateReview,
  validateSignup,
  validateLogin 
  } = require('../../utils/validation');

const router = express.Router();




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

      const errObj = {}

      if(existedUsername){
        // const err = new Error("User already exists");
        // err.title = "Bad request.";
        // // err.errors = ["User with that username already exists"];
        // err.errors = {username: "User with that username already exists"};
        // err.status = 403;
        // return next(err);
        errObj.username = "User with that username already exists";
      } 
      if(existedEmail) {
        // const err = new Error("User already exists");
        // err.title = "Bad request.";
        // // err.errors = ["User with that email already exists"];
        // err.errors = {email: "User with that email already exists"};
        // err.status = 403;
        // return next(err);
        errObj.email = "User with that email already exists";
      } 

      if(Object.values(errObj).length > 0) {
        const err = new Error("User already exists");
        err.title = "Bad request.";
        // err.errors = ["User with that email already exists"];
        err.errors = errObj;
        err.status = 403;
        return next(err);
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
    // err.errors = { credential: 'The provided credentials were invalid.' };
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
    group: ["Spot.id", "previewImage.id"],  
  });

  const spots = []
//set nested preview image to just url only or null if none exist and latest one
  for(let i = 0; i < allSpots.length; i++) {
      let spot = allSpots[i].toJSON();

      if(spot.avgRating) {
        spot.avgRating = Number(Number(spot.avgRating).toFixed(1));
      };

      if(spot.previewImage) {
        spot.previewImage = spot.previewImage[spot.previewImage.length - 1]?.url || null;
      }
      spots.push(spot)
  }

  res.json({
      Spots: spots
  });
})

/*****/


//get all reviews owned by the current user
router.get("/currentUser/reviews", requireAuth, async (req, res, next) => {
  const { user } = req;
  const userId = +user.id;

  const allReviews = await Review.findAll({
    where: {
      userId: userId
    },
    attributes: {
      include: ["id"]
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
        require: true
      },
      {
        model: Spot,
        attributes: {
          exclude: ["createdAt", "updatedAt", "description"]
        },
        include: {
          model: Image,
          as: "previewImage",
        }
      },
      {
        model: Image,
        as: "ReviewImages",
        attributes: ["id", "url"]
      }
    ],
  });

  const reviews = []

//loop through each review
  for(let i = 0; i < allReviews.length; i++) {
    const reviewObj = allReviews[i].toJSON();

//set nested preview image to just url only or null if none exist and latest one
    let previewImage = reviewObj.Spot.previewImage;

//checks to see if there are preview images
    if(previewImage.length > 0) {
      let previewTrueArr = [];
//iterate through each image to collect all the true previews
      for(let j = 0; j < previewImage.length; j++) {
        let image = previewImage[j];

        if(image) {
//pushes the true images into an arr
          if(image.preview === true) {
            previewTrueArr.push(image);
          }
        }
      }

//if the preview image has true image, set it to the recent one
      if(previewTrueArr.length > 0) {
        reviewObj.Spot.previewImage = previewTrueArr[previewTrueArr.length - 1]?.url || null;
      } else {
//if no true images, set preview ot null
        reviewObj.Spot.previewImage = null;
      }
//set to null, if no images are found in the arr of images
    } else {
      reviewObj.Spot.previewImage = null;
    }

    reviews.push(reviewObj);
  }

  res.json({
    Reviews: reviews
  })
});


/*****/


//get all bookings owned by the current user
router.get("/currentUser/bookings", requireAuth, async (req, res, next) => {
  const { user } = req;
  const userId = +user.id;

  const bookings = await Booking.findAll({
    where: {
      userId: userId
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ["createdAt", "updatedAt", "description"]
      },
      include: {
        model: Image,
        as: "previewImage",
        where: { preview: true },
      }
    },
    attributes: {
      include: ["id"]
    }
  })

  const bookingsArr = []

  //loop through each review
    for(let i = 0; i < bookings.length; i++) {
      const bookingObj = bookings[i].toJSON();
  
  //set nested preview image to just url only or null if none exist and latest one
      let previewImage = bookingObj.Spot.previewImage;
      if(previewImage) {
        bookingObj.Spot.previewImage = previewImage[previewImage.length - 1]?.url || null;
      }

      bookingsArr.push(bookingObj);
    }

  res.json({
    Bookings: bookingsArr
  })
});


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
});





/****************** EXPORT ********************************/
module.exports = router;