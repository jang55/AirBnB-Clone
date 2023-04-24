const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, sequelize, Review, Image, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');

const router = express.Router();

/***************** Validations *********************************/


const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .custom((value) => {
            const dateArr = value.split("-");
            if (dateArr.length !== 3) {
                return false;
            } else {
                return true;
            }
        })
        .custom((value) => {
            const dateArr = value.split("-");
            if(dateArr[0].length !== 4) {
                return false;
            } else if(dateArr[1].length !== 2 || dateArr[2].length !== 2) {
                return false;
            } else {
                return true;
            }
        })
        .withMessage(`Start date is required in format YYYY-MM-DD .ie 2000-01-25`)
        .custom((value, {req}) => {
            const date = new Date()
            return new Date(value) > date
        })
        .withMessage('Start date must be in the future'),
    check('endDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .custom((value) => {
            const dateArr = value.split("-");
            if (dateArr.length !== 3) {
                return false
            } else {
                return true
            }
        })
        .custom((value) => {
            const dateArr = value.split("-");
            if(dateArr[0].length !== 4) {
                return false;
            } else if(dateArr[1].length !== 2 || dateArr[2].length !== 2) {
                return false;
            } else {
                return true;
            }
        })
        .withMessage(`End date is required in format YYYY-MM-DD .ie 2000-01-25`)
        .custom((value, {req}) => {
            return value > req.body.startDate
        })
        .withMessage("endDate cannot be on or before startDate"),
    handleValidationErrors
  ]



/********************** Routes ************************************/

//helper function to check if date is available
function checkAvailableStartDate(date, booking) {
    if(date >= booking.startDate && date < booking.endDate) {
        return false
    } else {
        return true
    }
};

function checkAvailableEndDate(date, booking) {
    // console.log("users end date:", date);
    // console.log("bookers start date:", booking.startDate);
    if(date > booking.startDate && date <= booking.endDate) {
    // if(date > booking.endDate) 
        return false
    } else {
        return true

    }
};

function checkOverLapDates(start, end, booking) {
    // console.log("users start date:", start);
    // console.log("bookers start date:", booking.startDate);
    // console.log("--------------------------")
    // console.log("users end date:", end);
    // console.log("bookers end date:", booking.endDate);
    if(start < booking.startDate && end > booking.endDate) {
        return false
    } else {
        return true
    }
}


//updating the booking by id
router.put("/:bookingId", validateBooking, requireAuth, async (req, res, next) => {
    const bookingId = +req.params.bookingId;
//find the booking
    const booking = await Booking.findByPk(bookingId);
    const { startDate, endDate } = req.body
    const { user } = req;

//if booking doesnt exist, throw an error
    if(!booking) {
        const err = new Error("Booking couldn't be found");
        err.title = "Bad request.";
        err.message = "Booking couldn't be found";
        err.status = 404;
        return next(err);
    }

    const userId = +user.id;
    const bookingUserId = +booking.userId;
    const spotId = +booking.spotId;

//check to see if the user is owner of the booking for authorization
    if(userId !== bookingUserId) {
        const err = new Error("Need to be owner of the booking to make changes");
        err.title = "Bad request.";
        err.message = "Need to be owner of the booking to make changes";
        err.status = 403;
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
        const err = new Error("Past bookings can't be modified");
        err.title = "Bad request.";
        err.message = "Past bookings can't be modified";
        err.status = 400;
        return next(err);
    }

    const start = new Date(startDate);
    const userStart = Number(start.getTime())
    const bookingStartDate = booking.startDate.getTime();

//if there is a new start date given, enter loop checks for *BOTH* startDate and endDate
//to see if both dates are avialable to be used
    if(userStart !== bookingStartDate) {
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
                errMsg.push(endMsg);
            };

        //checks to see if the dates over lap another booking
            if(!checkOverLapDates(new Date(startDate), new Date(endDate), bookingObj)) {
                    errMsg.push(startMsg);
                    errMsg.push(endMsg);        
            };

        //if any conflicts found, throw the error 
            if(errMsg.length > 0) {
                const err = new Error("Sorry, this spot is already booked for the specified dates");
                err.title = "Forbidden.";
                err.message = "Sorry, this spot is already booked for the specified dates";
                err.errors = errMsg
                err.status = 403;
                return next(err);
            };
        };
    } else {
//if the start date IS THE SAME, *ONLY* checks to see if the end date is 
//available to be used
    //iterate through each booking
        for(let i = 0; i < spotBookings.length; i++) {
            let bookingObj = spotBookings[i].toJSON();
            let errMsg = [];
            let endMsg = "End date conflicts with an existing booking"

        //checks to see if the end date conflicts in between a booking
            if(!checkAvailableEndDate(new Date(endDate), bookingObj)) {
            //if the given booking is it's own booking conflict, skip and 
            //continue checking other bookings
                if(booking.id === bookingObj.id) {
                    continue;
                } else {
                    errMsg.push(endMsg)
                }
            };

        //if any conflicts found, throw the error 
            if(errMsg.length > 0) {
                const err = new Error("Sorry, this spot is already booked for the specified dates");
                err.title = "Forbidden.";
                err.message = "Sorry, this spot is already booked for the specified dates";
                err.errors = errMsg
                err.status = 403;
                return next(err);
            };
        }
    }

//update the booking to its new dates and save it
    if(startDate !== undefined) booking.startDate = new Date(startDate);
    if(endDate !== undefined) booking.endDate = new Date(endDate);
    await booking.save();

    res.json(booking);
});




/*****/







/****************** EXPORT ********************************/
module.exports = router;