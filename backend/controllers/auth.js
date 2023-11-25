const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    const result = await User.save(userDetails);

    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async ( req, res, next ) => { 
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.find( email );

    if ( user[0] !== 1 ) {
      const error = new Error( 'Invalid credentials Email not Registered' );
      error.statusCode = 401;
      throw error;

    }
    const userData = user[0][0];
    
    const isEqual = await bcrypt.compare( password, userData.password );
    if ( !isEqual ) { 
      const error = new Error( 'Invalid credentials Password is incorrect' );
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign( {
      email: userData.email,
      userId: userData.id}, 'secret', { expiresIn: '1h' }); 
    res.status( 200 ).json( { token: token, userId: userData.id } );
    
} catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

 
}