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



/********************** Routes ************************************/


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
    }

    res.json(spotObj)

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
        spot.previewImage = spot.previewImage[0]?.url;
        spots.push(spot)
    }

    res.json({
        spots: spots
    });
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