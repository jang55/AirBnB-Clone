const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
//helper funcs
const { 
    err404,
    err400,
    err403
} = require("../../utils/helpers.js");
const { User, Spot, sequelize, Review, Image } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



/********************** Routes ************************************/


// delete a image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const imageId = +req.params.imageId;
    const image = await Image.unscoped().findOne({
        where: {
            id: imageId,
        },
        include: [
            {
                model: Review
            },
            {
                model: Spot
            }
        ]
    });

//if image is not found, throw error
    if(!image) {
        const err = err404("Image not found");
        return next(err);
    }

    const { user } = req;
    const userId = +user.id;
    
    if(image.dataValues.imageableType === "Review") {
    //gets the review userId
        const revierUserId = +image.dataValues.Review.userId;
    //if the user is not the owner of the review
        if(userId !== revierUserId) {
            const err = err403("Need to be owner of the review to delete images");
            return next(err);
        };
    } else if(image.dataValues.imageableType === "Spot") {
    //gets the spots ownerId
        const ownerId = +image.dataValues.Spot.ownerId;
    // is the user is not the owner of the spot
        if(userId !== ownerId) {
            const err = err403("Need to be owner of the spot to delete images");
            return next(err);
        };
    };

// delete the record from the table
    await image.destroy({ force: true });

    res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
        }
    );
});




/****************** EXPORT ********************************/
module.exports = router;