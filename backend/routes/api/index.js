const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotRouter = require("./spots.js");
const reviewRouter = require("./reviews.js");
const bookingRouter = require("./bookings.js")
const imageRouter = require("./images.js")
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');


// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser)

//Keep code above this line untouch
/************** Test Routes ***********************/

// // GET /api/restore-user
// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
//   }
// );


// // GET /api/require-auth
// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
//   }
// );


// // GET /api/set-token-cookie
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

/***********************************************/

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use("/locations", spotRouter);

router.use("/reviews", reviewRouter);

router.use("/bookings", bookingRouter);

router.use("/images", imageRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });








/**************** export *******************************/
module.exports = router;