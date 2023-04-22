const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, sequelize, Review, Image } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/***************** Validations *********************************/


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

//if review doesnt exist, throw an error
    if(!review) {
        const err = new Error("Review couldn't be found");
        err.title = "Bad request.";
        err.message = "Review couldn't be found";
        err.status = 404;
        return next(err);
    }

    const { url } = req.body;
    const { user } = req;
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
            imageableType: "Review",
            imageableId: reviewId
        }
    });

//if the images is more than 10, throw error
    if(images.length >= 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.title = "Bad request.";
        err.message = "Maximum number of images for this resource was reached";
        err.status = 400;
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
        const err = new Error("Review couldn't be found");
        err.title = "Bad request.";
        err.message = "Review couldn't be found";
        err.status = 404;
        return next(err);
    }

    const { review, stars } = req.body
    const { user } = req;
    const userId = +user.id;
    const reviewUser = currentReview.dataValues.User;
    const reviewOwnerId = +reviewUser.id;

//checks to see if the currentUser is the owner of the review
    if(userId !== reviewOwnerId) {
        const err = new Error("Need to be owner of the review to add images");
        err.title = "Forbidden.";
        err.message = "Need to be owner of the review to add images";
        err.status = 403;
        return next(err);
    }

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

    res.json(result)
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
        const err = new Error("Review couldn't be found");
        err.title = "Bad request.";
        err.message = "Review couldn't be found";
        err.status = 404;
        return next(err);
    }

    const { user } = req;
    const userId = +user.id;
    const reviewUser = currentReview.dataValues.User;
    const reviewOwnerId = +reviewUser.id;

//checks to see if the currentUser is the owner of the review
    if(userId !== reviewOwnerId) {
        const err = new Error("Need to be owner of the review to delete the review");
        err.title = "Forbidden.";
        err.message = "Need to be owner of the review to delete the review";
        err.status = 403;
        return next(err);
    }

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