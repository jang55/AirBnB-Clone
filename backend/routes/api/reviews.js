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
const { User, Spot, sequelize, Review, Image } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors,
    validateSpot,
    validateImage,
    validateBooking,
    validateReview,
    validateSignup,
    validateLogin,
    validateImageUrl
    } = require('../../utils/validation');


const router = express.Router();





/********************** Routes ************************************/


//create an image for a review
router.post("/:reviewId/images", validateImageUrl, requireAuth, async (req, res, next) => {
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

//if review doesnt exist, throw an error
    if(!review) {
        const err = err404("Review couldn't be found");
        return next(err);
    };

    const { url } = req.body;
    const { user } = req;
    const userId = +user.id;
    const reviewUser = review.dataValues.User;
    const reviewOwnerId = +reviewUser.id;

//checks to see if the currentUser is the owner of the review
    if(userId !== reviewOwnerId) {
        const err = err403("Need to be owner of the review to add images");
        return next(err);
    };

//findall the images related to the review
    const images = await Image.findAll({
        where: {
            imageableType: "Review",
            imageableId: reviewId
        }
    });

//if the images is more than 10, throw error
    if(images.length >= 10) {
        const err = err400("Maximum number of images for this resource was reached");
        return next(err);
    };

//create a new image for that review
    const newImage = await Image.create({
        url: url,
        imageableType: "Review",
        imageableId: reviewId
    });

    let result = {};

    result.id = newImage.id;
    result.url = url;

    res.json(result);
});


/*****/


//edit a review
router.put("/:reviewId", validateReview, requireAuth, async (req, res, next) => {
    const reviewId = +req.params.reviewId;

//find the review
    const currentReview = await Review.findOne({
        where:{
            id: reviewId
        },
        include: {
            model: User
        },
        attributes: {
            include: ["id"]
        }
    });

//if review doesnt exist, throw an error
    if(!currentReview) {
        const err = err404("Review couldn't be found");
        return next(err);
    }

    const { review, stars } = req.body;
    const { user } = req;
    const userId = +user.id;
    const reviewUser = currentReview.dataValues.User;
    const reviewOwnerId = +reviewUser.id;

//checks to see if the currentUser is the owner of the review
    if(userId !== reviewOwnerId) {
        const err = err403("Need to be owner of the review to add images");
        return next(err);
    };

//change the value of the spot if the value exist
    if(review !== undefined) currentReview.review = review;
    if(stars !== undefined) currentReview.stars = stars;
  

    await currentReview.save();
    
    const result = {};
    result.id = currentReview.id;
    result.userId = currentReview.userId;
    result.spotId = currentReview.spotId;
    result.review = currentReview.review;
    result.stars = currentReview.stars;
    result.createdAt = currentReview.createdAt;
    result.updatedAt = currentReview.updatedAt;

    res.json(result);
});


/*****/


//delete a review
router.delete("/:reviewId", requireAuth, async (req, res, next) => {
    const reviewId = +req.params.reviewId;
    
//find the review
    const currentReview = await Review.findOne({
        where:{
            id: reviewId
        },
        include: {
            model: User
        },
        attributes: {
            include: ["id"]
        }
    });

//if review doesnt exist, throw an error
    if(!currentReview) {
        const err = err404("Review couldn't be found");
        return next(err);
    }

    const { user } = req;
    const userId = +user.id;
    const reviewUser = currentReview.dataValues.User;
    const reviewOwnerId = +reviewUser.id;

//checks to see if the currentUser is the owner of the review
    if(userId !== reviewOwnerId) {
        const err = err403("Need to be owner of the review to delete the review");
        return next(err);
    };

//delete the record from the table
    await currentReview.destroy({ force: true });

    res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
        }
    );
});



/****************** EXPORT ********************************/
module.exports = router;