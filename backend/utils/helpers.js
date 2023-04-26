function err400(message) {
    const err = new Error(message);
    err.title = "Bad request.";
    err.message = message;
    err.status = 400;
    return err;
}

/*********/

function err403(message) {
    const err = new Error(message);
    err.title = "Forbidden.";
    err.message = message;
    err.status = 403;
    return err;
}

/*********/

function err404(message) {
    const err = new Error(message);
    err.title = "Not Found.";
    err.message = message;
    err.status = 404;
    return err
}

/*********/

//check does the start date conflict in any bookings
function checkAvailableStartDate(date, booking) {
    if(date >= booking.startDate && date < booking.endDate) {
        return false
    } else {
        return true
    }
};

/*********/

//checks to see if the end dates conflicts with any booking
function checkAvailableEndDate(date, booking) {
    if(date > booking.startDate && date <= booking.endDate) {
        return false
    } else {
        return true

    }
};

/*********/

//checks to see if the dates are overlapping any bookings
function checkDoesNotOverLapDates(start, end, booking) {
    if(start < booking.startDate && end > booking.endDate) {
        return false
    } else {
        return true
    }
}


/******************* EXPORT *********************************/
module.exports = {
    err404,
    err400,
    err403,
    checkAvailableStartDate,
    checkAvailableEndDate,
    checkDoesNotOverLapDates
  };