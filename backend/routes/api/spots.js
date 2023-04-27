const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
//helper funcs
const { 
    err404,
    err400,
    err403,
    checkAvailableStartDate,
    checkAvailableEndDate,
    checkDoesNotOverLapDates
} = require("../../utils/helpers.js")
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





/********************** Routes ************************************/

//get all bookings by spot id
router.get("/:locationId/bookings", requireAuth, async (req, res, next) => {
    const spotId = +req.params.locationId;
    const spot = await Spot.findByPk(spotId);

//if spot is not found, throw error
    if(!spot) {
        const err = err404("Spot couldn't be found")
        return next(err);
    }

    const { user } = req
    const userId = +user.id;
    const ownerId = +spot.ownerId;

    let bookings;
//check to see if the user is the owner of the spot
    if(userId !== ownerId) {
        bookings = await Booking.scope({method: ["notOwner", spotId]}).findAll()
    }else {
        bookings = await Booking.scope({method: ["owner", spotId]}).findAll()
    }

    res.json({
        Bookings: bookings
    })
});


/*****/


//Get all Reviews by spot id
router.get("/:locationId/reviews", async (req, res, next) => {
    const spotId = +req.params.locationId;
    const spot = await Spot.findByPk(spotId);

    if(!spot) {
        const err = err404("Spot couldn't be found")
        return next(err);
    }
    const spotReviews = await spot.getReviews({
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"],
                require: true
            },
            {
                model: Image,
                as: "ReviewImages",
                attributes: ["id", "url"]
            }
        ]
    });

    res.json({
        Reviews: spotReviews
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
        group: ["spotImages.id", "Spot.id", "Owner.id"],
    });


    

//if spot does not exist, throw error
    if(!spot) {
        const err = err404("Spot couldn't be found")
        return next(err);
    }

// change query to POJO
    const spotObj = spot.toJSON();

// reassign avrStarRating to be decimal with 1 place
    if(spotObj.avgStarRating) {
        spotObj.avgStarRating = Number(Number(spotObj.avgStarRating).toFixed(1));
    };

    if(spotObj.numReviews) {
        spotObj.numReviews = Number(spotObj.numReviews);
    };

    res.json(spotObj);
});


/*****/


//Get all spots
router.get("/", async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    const errMsg = [];
    const query = {
        where: {}
    };

//checks to see if any of the query exists, and turn it into a number type or a NaN
    if(page) page = parseInt(page);
    if(size) size = parseInt(size);
    if(minLat) minLat = parseInt(minLat);
    if(maxLat) maxLat = parseInt(maxLat);
    if(minLng) minLng = parseInt(minLng);
    if(maxLng) maxLng = parseInt(maxLng);
    if(minPrice) minPrice = parseInt(minPrice);
    if(maxPrice) maxPrice = parseInt(maxPrice);

//checks to see if page is below 0 or is a page is not a number
    breakme: if(Number.isNaN(page) || page < 0) {
        errMsg.push("Page must be greater than or equal to 0");
    } else if(page > 10) {
    //if page is greater than 10, set page to 10 as max
        page = 10;
    } else if (page >= 0 && page <= 10) {
    //if page value is within limits, keep value
        break breakme;  
    } else {
    //if page is undefined set default to 0
        page = 0;
    }

//checks to see if size is less than 0 and if size is not a number
    breakSize: if(Number.isNaN(size) || size < 0) {
        errMsg.push("Size must be greater than or equal to 0");
    } else if(size > 20) {
    //if size is greater than 20, set it to 20 as a max number or as default
        size = 20;
    } else if (size >= 0 && size <= 20) {
    //if size value is within limits, keep value
        break breakSize;  
    } else {
    //if size is undefined set default to 0
        size = 20;
    }

//set up the calculations for limit and size and add it to the query object
    let limit = size;
    let offset = Math.abs(size * (page));
    query.limit = limit;
    query.offset = offset;
    
//checks minimum Latitude
    if(Number.isNaN(minLat) || minLat < -90 || minLat > 90) {
        errMsg.push("Minimum latitude is invalid");
    } else if(minLat){
        query.where.lat = {[Op.gte]: minLat};
    }

//checks maximum Latitude
    if(Number.isNaN(maxLat) || maxLat > 90 || maxLat < -90) {
        errMsg.push("Maximum latitude is invalid");
    } else if(maxLat){
        query.where.lat = {[Op.lte]: maxLat};
    }

//checks minimum Longitude
    if(Number.isNaN(minLng) || minLng < -180 || minLng > 180) {
        errMsg.push("Minimum longitude is invalid")
    } else if(minLng) {
        query.where.lng = {[Op.gte]: minLng};
    }

//checks maximum Longitude
    if(Number.isNaN(maxLng) || maxLng > 180 || maxLng < -180) {
        errMsg.push("Maximum longitude is invalid")
    } else if(maxLng){
        query.where.lng = {[Op.lte]: maxLng};
    }

//checks minimum price
    if(Number.isNaN(minPrice) || minPrice < 0) {
        errMsg.push("Minimum price must be greater than or equal to 0")
    } else if(minPrice) {
        query.where.price = {[Op.gte]: minPrice};
    }

//checks maximum price
    if(Number.isNaN(maxPrice) || maxPrice < 0) {
        errMsg.push("Maximum price must be greater than or equal to 0")
    } else if(maxPrice){
        query.where.price = {[Op.lte]: maxPrice};
    }

//if there are any errors in between the query filters, throw err
    if(errMsg.length > 0) {
        const err = err400("Validation Error");
        err.errors = errMsg
        return next(err);
    }

//query for all the spots
    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
            ] 
        },
        include:[
            {
                model: Review,
                attributes: [],
                required: false
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
        subQuery: false,
        ...query,
    });

    const spots = []

//iteratng through each spot to fix the decimal
    for(let i = 0; i < allSpots.length; i++) {
        let spot = allSpots[i].toJSON();

        if(spot.avgRating) {
            spot.avgRating = Number(Number(spot.avgRating).toFixed(1));
        };

        spot.previewImage = spot.previewImage[0]?.url || null;
        spots.push(spot);
    }

    res.json({
        Spots: spots,
        page: page,
        size: size
    });
});


/*****/



//create a booking for spot id
router.post("/:locationId/bookings", validateBooking, requireAuth, async (req, res, next) => {
    const spotId = +req.params.locationId;
    const spot = await Spot.findByPk(spotId);

//if spot does not exist, throw error
    if(!spot) {
        const err = err404("Spot couldn't be found");
        return next(err);
    }

    const { startDate, endDate } = req.body;
    const { user } = req;
    const userId = +user.id;
    const ownerId = +spot.ownerId;

//checks to see if the currentUser is the owner of the review
    if(userId === ownerId) {
        const err = err400("Owners can not book at there own spots");
        return next(err);
    }

//find bookings related to stop by id
    const bookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    });

//iterate through each booking
    for(let i = 0; i < bookings.length; i++) {
        let bookingObj = bookings[i].toJSON();
        let errMsg = [];
        let startMsg = "Start date conflicts with an existing booking";
        let endMsg = "End date conflicts with an existing booking";

    //checks to see if the start date conflicts in between a booking
        if(!checkAvailableStartDate(new Date(startDate), bookingObj)) {
            errMsg.push(startMsg)
        };

    //checks to see if the end date conflicts in between a booking
        if(!checkAvailableEndDate(new Date(endDate), bookingObj)) {
            errMsg.push(endMsg)
        };

    //checks to see if the dates over lap another booking
        if(!checkDoesNotOverLapDates(new Date(startDate), new Date(endDate), bookingObj)) {
            errMsg.push(startMsg)
            errMsg.push(endMsg)
        };

    //if any conflicts found, throw the error 
        if(errMsg.length > 0) {
            const err = err403("Sorry, this spot is already booked for the specified dates");
            err.errors = errMsg
            return next(err);
        };
    };

// create a new booking
    const newBooking = await Booking.create({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId: userId,
        spotId: spotId
    });

    res.json(newBooking);
})


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
        const err = err404("Spot couldn't be found");
        return next(err);
    };

    const userReview = await spot.getReviews({
        where: {
            spotId: spotId,
            userId: userId
        }
    });

//check to see if a review exist for spot by the user
    if(userReview.length > 0) {
        const err = err403("User already has a review for this spot");
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
    res.status(201);
    res.json(createdReview);
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
        const err = err404("Spot couldn't be found");
        return next(err);
    }

    const userId = +user.id;
    const ownerId = +spot.ownerId;

//check to see if the user is owner of the spot for authorization
    if(userId !== ownerId) {
        const err = err403("Need to be owner of the spot to add images");
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

    const result = {};
    result.id = image.id;
    result.url = image.url;
    result.preview = image.preview;

    res.json(result);
});


/*****/


//creates a new spot
router.post("/", validateSpot, requireAuth, async (req, res, next) => {
    const { user } = req;
    const ownerId = +user.id;
    let { address, city, state, country, lat, lng, name, description, price } = req.body;

//find the current user
    const owner = await User.findByPk(ownerId);

    if(lat) lat = Number(lat);
    if(lng) lng = Number(lng);
    if(price) price = Number(price);

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
    
    res.status(201);
    res.json(newSpot);
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
        const err = err404("Spot couldn't be found");
        return next(err);
    }

    const userId = +user.id;
    const ownerId = +spot.ownerId;

//check to see if the user is owner of the spot for authorization
    if(userId !== ownerId) {
        const err = err403("Need to be owner of the spot to add images");
        return next(err);
    } 

//change the value of the spot if the value exist
    if(address !== undefined) spot.address = address;
    if(city !== undefined) spot.city = city;
    if(state !== undefined) spot.state = state;
    if(country !== undefined) spot.country = country;
    if(lat !== undefined) spot.lat = Number(lat);
    if(lng !== undefined) spot.lng = Number(lng);
    if(name !== undefined) spot.name = name;
    if(description !== undefined) spot.description = description;
    if(price !== undefined) spot.price = Number(price);

    await spot.save();

    res.json(spot);
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
        const err = err404("Spot couldn't be found");
        return next(err);
    }

    const userId = +user.id;
    const ownerId = +spot.ownerId;

//check to see if the user is owner of the spot for authorization
    if(userId !== ownerId) {
        const err = err403("Need to be owner of the spot to add images");
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