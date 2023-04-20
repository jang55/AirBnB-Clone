const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, sequelize, Review, Image } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/***************** Validations *********************************/

//Get all spots by id
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

    if(!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Bad request.";
        err.message = "Spot couldn't be found";
        err.status = 404;
        next(err);
    }

    res.json(spot);
});



//Get all spots
router.get("/", async (req, res, next) => {
    const allSpots = await Spot.findAll({
        attributes: {
            include:[
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

        spot.previewImage = spot.previewImage[0].url;
        // console.log(allSpots[i].toJSON())
        // allSpots[i] = spot;
        spots.push(spot)
    }

    res.json({
        spots: spots
    });
});












/****************** EXPORT ********************************/
module.exports = router;