const router = require('express').Router();

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




router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });


/***********************************************/






/**************** export *******************************/
module.exports = router;