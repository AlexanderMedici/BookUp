const express = require( 'express' );
const { body } = require( 'express-validator' ); 
const router = express.Router(); 
const User = require( "../backend/model/user" ); 

router.post( "/signup",
    [
        body( "name".trim().not().isEmpty(),
            body( "email" ).isEmail().withMessage( "Email Not Valid Try A Valid Email." )
                .custom( async ( email ) => {
                    const user = await User.find( email );
                    if ( user[0].length > 0 ) {
                        return Promise.reject( "Email Is Taken Try A New One." );


                    }

                } )
                .normalizeEmail(),
            body( password ).trim().isLength( { min: 6 } ).withMessage( "Password must be at least 6 characters." ),

    

    
        )],
    authController.signup
); 

module.exports = router