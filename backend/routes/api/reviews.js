const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, sequelize, Review, Image } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/***************** Validations *********************************/


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


//create an image for a review
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
    const reviewId = +req.params.reviewId;
//find the review
    const review = await Review.findOne({
        where:{
            id: reviewId
        },
        include: {
            model: User
        }
    });
    const { url } = req.body;
    const { user } = req;
    

//if review doesnt exist, throw an error
    if(!review) {
        const err = new Error("Review couldn't be found");
        err.title = "Bad request.";
        err.message = "Review couldn't be found";
        err.status = 404;
        return next(err);
    }

    const userId = +user.id;
    const reviewUser = review.dataValues.User;
    const reviewOwnerId = +reviewUser.id;

//checks to see if the currentUser is the owner of the review
    if(userId !== reviewOwnerId) {
        const err = new Error("Need to be owner of the review to add images");
        err.title = "Forbidden.";
        err.message = "Need to be owner of the review to add images";
        err.status = 403;
        return next(err);
    }

//findall the images related to the review
    const images = await Image.findAll({
        where: {
            imageableId: reviewId
        }
    });

//if the images is more than 10, throw error
    if(images.length >= 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.title = "Forbidden.";
        err.message = "Maximum number of images for this resource was reached";
        err.status = 403;
        return next(err);
    }

//create a new image for that review
    const newImage = await Image.create({
        url: url,
        imageableType: "Review",
        imageableId: reviewId
    });

    let result = {};

    result.id = newImage.id;
    result.url = url

    res.json(result);
});


/*****/








/****************** EXPORT ********************************/
module.exports = router;