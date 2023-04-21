const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, sequelize, Review, Image } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/***************** Validations *********************************/



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


/********************** Routes ************************************/

//Get all Reviews by spot id
router.get("/:locationId/reviews", async (req, res, next) => {
    const spotId = +req.params.locationId;
    const spot = await Spot.findByPk(spotId);

    if(!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Bad request.";
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err);
    }
    const spotReviews = await spot.getReviews({
        attributes: {
            include: ["id"]
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"],
                require: true
            },
        ]
    })

    const reviews = [];

//loop through each review
    for(let i = 0; i < spotReviews.length; i++) {
        const reviewObj = spotReviews[i].toJSON();
        const images = await spotReviews[i].getImages({ attributes: ["id", "url"] });
    //if there are images, set the image to ReviewImages else set to null
        if(images.length < 1) {
            reviewObj.ReviewImages = null;
            reviews.push(reviewObj);
        } else {
            reviewObj.ReviewImages = images;
            reviews.push(reviewObj);
        };
    };

    res.json({
        Reviews: reviews
    });
});


/*****/


//Get spots by id
router.get("/:locationId", async (req, res, next) => {
    const spotId = +req.params.locationId;

    const spot = await Spot.findOne({
        where: {
            id: spotId
        },
        attributes: {
            include:[
                [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
            ] 
        },
        include:[
            {
                model: Review,
                attributes: []
            },
            {
                model: Image,
                as: "spotImages",
                where: {
                    imageableId: spotId
                },
                attributes: ["id", "url", "preview"],
                required: false,
            },
            {
                model: User,
                as: "Owner",
                attributes: ["id", "firstName", "lastName"]
            }
        ],        
        group: "spotImages.id",
    });



//if spot does not exist, throw error
    if(!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Bad request.";
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err);
    }

// change query to POJO
    const spotObj = spot.toJSON();

//reassign avrStarRating to be decimal with 1 place
    if(spotObj.avgStarRating) {
        spotObj.avgStarRating = +spotObj.avgStarRating.toFixed(1);
    };

    res.json(spotObj);

// //get the count of reviews
//     const reviewCount = await Review.count({ where: { spotId: spotId } })
//     spotObj.numReviews = reviewCount;

// //get the average of the stars
//     const reviewStarAverage = await Review.findAll({
//         where: { spotId: spotId },
//         attributes: [
//             [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"]
//         ]
//     })
//     spotObj.avgStarRating = +reviewStarAverage[0].dataValues.avgStarRating.toFixed(1);

// //get the images associated with the spot
//     const images = await spot.getImages({
//         where: { imageableId: spotId },
//         attributes: ["id", "url", "preview"],
//         required: false,
//     });
//     spotObj.SpotImages = images;

// //get the owner of the spot
//     const owner = await spot.getOwner({attributes: ["id", "firstName", "lastName"]});
//     spotObj.Owner = owner;

//     res.json(spotObj);
});

/*****/

//Get all spots
router.get("/", async (req, res, next) => {
    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
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

        if(spot.avgRating) {
            spot.avgRating = +spot.avgRating.toFixed(1);
        }

        spot.previewImage = spot.previewImage[0]?.url || null;
        spots.push(spot)
    }

    res.json({
        spots: spots
    });
});


/*****/


//create an review for a spot
router.post("/:locationId/reviews", validateReview, requireAuth, async (req, res, next) => {
    const spotId = +req.params.locationId;
//find the spot
    const spot = await Spot.findByPk(spotId);
    const { review, stars } = req.body;
    const { user } = req;
    const userId = +user.id;

//if spot doesnt exist, throw an error
    if(!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Bad request.";
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err);
    }

    const userReview = await spot.getReviews({
        where: {
            spotId: spotId,
            userId: userId
        }
    });

//check to see if a review exist for spot by the user
    if(userReview.length > 0) {
        const err = new Error("User already has a review for this spot");
        err.title = "Forbidden.";
        err.message = "User already has a review for this spot";
        err.status = 403;
        return next(err);
    } 

    //create a new review
    const createdReview = await spot.createReview(
        {
            review: review,
            stars: +stars,
            userId: userId,
            spotId: spotId
        }
    );

//find the new review id and get the response back
    const newReview = await spot.getReviews({
        where: {
            userId: userId,
            spotId:spotId
        },
        attributes: { include: ["id"] }
    });

    res.json(newReview[0]);
});


/*****/


//create an image for a spot
router.post("/:locationId/images", validateImage, requireAuth, async (req, res, next) => {
    const spotId = +req.params.locationId;
//find the spot
    const spot = await Spot.findByPk(spotId);
    const { url, preview } = req.body;
    const { user } = req;

//if spot doesnt exist, throw an error
    if(!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Bad request.";
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err);
    }

    const userId = +user.id;
    const ownerId = +spot.ownerId;

//check to see if the user is owner of the spot for authorization
    if(userId !== ownerId) {
        const err = new Error("Need to be owner of the spot to add images");
        err.title = "Bad request.";
        err.message = "Need to be owner of the spot to add images";
        err.status = 403;
        return next(err);
    } 

    //create a new image
    const image = await spot.createImage(
        {
            url: url,
            preview: preview,
            imageableType: "Spot",
            imageableId: spotId
        }
    );

//find the new image id and get the response back
    const imageId = image.dataValues.id;
    const newImage = await spot.getImages({ where: {id: imageId} })

    res.json(newImage[0]);
});


/*****/


//creates a new spot
router.post("/", validateSpot, requireAuth, async (req, res, next) => {
    const {user} = req;
    const ownerId = +user.id
    const {address, city, state, country, lat, lng, name, description, price} = req.body

//find the current user
    const owner = await User.findByPk(ownerId);

//makes a new spot associated with the current user
    const newSpot = await owner.createSpot(
        {
            ownerId, 
            address, 
            city, 
            state, 
            country, 
            lat, 
            lng, 
            name, 
            description, 
            price
        }
    );
    
    res.status(201)
    res.json(newSpot)
})


/*****/

//updating the spot by id
router.put("/:locationId", validateSpot, requireAuth, async (req, res, next) => {
    const spotId = +req.params.locationId;
//find the spot
    const spot = await Spot.findByPk(spotId);
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { user } = req;

//if spot doesnt exist, throw an error
    if(!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Bad request.";
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err);
    }

    const userId = +user.id;
    const ownerId = +spot.ownerId;

//check to see if the user is owner of the spot for authorization
    if(userId !== ownerId) {
        const err = new Error("Need to be owner of the spot to add images");
        err.title = "Bad request.";
        err.message = "Need to be owner of the spot to add images";
        err.status = 403;
        return next(err);
    } 

//change the value of the spot if the value exist
    if(address !== undefined) spot.address = address;
    if(city !== undefined) spot.city = city;
    if(state !== undefined) spot.state = state;
    if(country !== undefined) spot.country = country;
    if(lat !== undefined) spot.lat = lat;
    if(lng !== undefined) spot.lng = lng;
    if(name !== undefined) spot.name = name;
    if(description !== undefined) spot.description = description;
    if(price !== undefined) spot.price = price;

    await spot.save();

    res.json(spot)
});


/*****/

//delete spot by id
router.delete("/:locationId", requireAuth, async (req, res, next) => {
    const spotId = +req.params.locationId;
//find the spot
    const spot = await Spot.findByPk(spotId);
    const { user } = req;

//if spot doesnt exist, throw an error
    if(!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Bad request.";
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err);
    }

    const userId = +user.id;
    const ownerId = +spot.ownerId;

//check to see if the user is owner of the spot for authorization
    if(userId !== ownerId) {
        const err = new Error("Need to be owner of the spot to add images");
        err.title = "Bad request.";
        err.message = "Need to be owner of the spot to add images";
        err.status = 403;
        return next(err);
    } 

//delete the record from the table
     await spot.destroy({ force: true });

     res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
        }
     );
});




/****************** EXPORT ********************************/
module.exports = router;