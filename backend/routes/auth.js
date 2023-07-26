// requiring in all needed files
const express = require( 'express' );
const { body } = require('express-validator');
const router = express.Router();
const User = require('../model/user');
const authController = require('../controllers/auth');
const errorController = require( "../controllers/error" );
// end 



router.post(
  '/signup',
  [
    body('name').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
          return Promise.reject('Email address already exist!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 7 }),
  ],
  authController.signup
);
module.exports = { signup: ['.post', '/signup'] };

//  router.post('/login', authController.login);

module.exports = router;