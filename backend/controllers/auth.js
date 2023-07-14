const { validationResult } = require( 'express-validator' );
const bcrypt = require( "bcryptjs" ); 

exports.signup = async ( req, res, next ) => { 
    const errors = validationResult( req ); 
    if ( !errors.isEmpty() )return

    const name = req.body.name; 
    const email = req.body.email;
    const password = req.body.password;
    try {
        const hashedPassword = await bcrypt.hash( password, 10 );
const userDetails = {
    name: name, 
    email: email, 
    password:hashedPassword
        }
        const result = await User.save( userDetails ); 
        res.status( 201 ).json( {message:"New User Registered"} )
        if ( !err.statusCode ) { 

        }

    } catch ( err ) { 

    }
    
}