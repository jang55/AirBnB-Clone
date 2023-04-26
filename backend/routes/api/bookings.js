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
const booking = require('../../db/models/booking');

const router = express.Router();




/********************** Routes ************************************/



//updating the booking by id
router.put("/:bookingId", validateBooking, requireAuth, async (req, res, next) => {
    const bookingId = +req.params.bookingId;
//find the booking
    const booking = await Booking.findByPk(bookingId);
    const { startDate, endDate } = req.body
    const { user } = req;

//if booking doesnt exist, throw an error
    if(!booking) {
        const err = err404("Booking couldn't be found");
        return next(err);
    }

    const userId = +user.id;
    const bookingUserId = +booking.userId;
    const spotId = +booking.spotId;

//check to see if the user is owner of the booking for authorization
    if(userId !== bookingUserId) {
        const err = err403("Need to be owner of the booking to make changes");
        return next(err);
    };

    //find bookings related to stop by id
    const spotBookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    });

//checks to see if the booking is an old booking
    if(booking.dataValues.endDate.getTime() <= new Date().getTime()) {
        const err = err400("Past bookings can't be modified");
        return next(err);
    }

// enter loop checks for *BOTH* startDate and endDate to see if both dates are avialable to be used
    //iterate through each booking
    for(let i = 0; i < spotBookings.length; i++) {
        let bookingObj = spotBookings[i].toJSON();
        let errMsg = [];
        let startMsg = "Start date conflicts with an existing booking";
        let endMsg = "End date conflicts with an existing booking"

    //checks to see if the start date conflicts in between a booking
        if(!checkAvailableStartDate(new Date(startDate), bookingObj)) {
        //if the given booking is it's own booking conflict, skip and 
        //continue checking other bookings
            if(booking.id === bookingObj.id) {
                continue;
            } else {
                errMsg.push(startMsg);
            }
        };

    //checks to see if the end date conflicts in between a booking
        if(!checkAvailableEndDate(new Date(endDate), bookingObj)) {
            if(booking.id === bookingObj.id) {
                continue;
            } else {
                errMsg.push(endMsg)
            }
        };

    //checks to see if the dates over lap another booking
        if(!checkDoesNotOverLapDates(new Date(startDate), new Date(endDate), bookingObj)) {
            if(booking.id === bookingObj.id) {
                continue;
            } else {
                errMsg.push(startMsg);
                errMsg.push(endMsg);
            }         
        };

    //if any conflicts found, throw the error 
        if(errMsg.length > 0) {
            const err = err403("Sorry, this spot is already booked for the specified dates");
            err.errors = errMsg
            return next(err);
        };
    };

//update the booking to its new dates and save it
    if(startDate !== undefined) booking.startDate = new Date(startDate);
    if(endDate !== undefined) booking.endDate = new Date(endDate);
    await booking.save();

    res.json(booking);
});


/*****/


//delete a booking
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
    const bookingId = +req.params.bookingId;
//find the booking
    const booking = await Booking.findByPk(bookingId, {
        include: {
            model: Spot
        }
    });

//if booking doesnt exist, throw an error
    if(!booking) {
        const err = err404("Booking couldn't be found");
        return next(err);
    }

    const { user } = req;
    const userId = +user.id;
    const ownerId = +booking.dataValues.Spot.ownerId;
    const bookingUserId = +booking.userId;

//check to see if the user is owner of the spot for authorization
    if(!(userId === bookingUserId || userId === ownerId)) {
        const err = err403("Need to be owner of the booking or be the spots owner to delete a booking");
        return next(err);
    } 

//checks to see if the start date has already started and in the past
    if(booking.dataValues.startDate.getTime() <= new Date().getTime()) {
        const err = err400("Bookings that have been started can't be deleted");
        return next(err);
    }
//delete the record from the table
     await booking.destroy({ force: true });

     res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
        }
     );
});





/****************** EXPORT ********************************/
module.exports = router;