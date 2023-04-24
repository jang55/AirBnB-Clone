function err400(message) {
    const err = new Error(message);
    err.title = "Bad request.";
    err.message = message;
    err.status = 400;
    return err;
}



function err403(message) {
    const err = new Error(message);
    err.title = "Forbidden.";
    err.message = message;
    err.status = 403;
    return err;
}




function err404(message) {
    const err = new Error(message);
    err.title = "Not Found.";
    err.message = message;
    err.status = 404;
    return err
}




/******************* EXPORT *********************************/
module.exports = {
    err404,
    err400,
    err403
  };