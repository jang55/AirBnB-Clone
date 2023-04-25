const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/*****************************************/

// Log out
router.delete('/', (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);



/************ EXPORT *****************/


module.exports = router;