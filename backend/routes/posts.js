const express = require('express');
const postsController = require( '../controllers/posts' );
const router = express.Router();
const { body } = require( 'express-validator' );


const auth = require('../middleware/auth.js')


router.get('/', auth, postsController.fetchAll);

router.post(
  '/',
  [
    auth, 
    body('title').trim().isLength({ min: 5 }).not().isEmpty(),
    body('body').trim().isLength({ min: 10 }).not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  postsController.postPost
);

router.delete('/:id',auth,  postsController.deletePost);

module.exports = router;

