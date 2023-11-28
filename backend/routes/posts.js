const express = require('express');
const postsController = require( '../controllers/posts' );
const router = express.Router();
const { body } = require( 'express-validator' );





router.get('/',  postsController.fetchAll);

router.post(
  '/',
  [
  
    body('title').trim().isLength({ min: 5 }).not().isEmpty(),
    body('body').trim().isLength({ min: 10 }).not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  postsController.postPost
);

router.delete('/:id', postsController.deletePost);

module.exports = router;

