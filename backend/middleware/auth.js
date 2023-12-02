const jwt = require( 'jsonwebtoken' );    

module.exports = ( req, res, next ) => {
    const authHeader = req.get( 'Authorization' );
    if ( !authHeader ) {
        const error = new Error( 'No authorization' );
        error.status = 401;
        throw error;

    }
    const token = authHeader.split( ' ' )[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify( token, 'secretfortoken' );
    } catch ( error ) {
    err.statusCode = 500;
        throw err;
    }


    if ( !decodedToken ) { 
        const error = new Error( 'Invalid token' );
        error.status = 401;
    }
    req.isLoggedIn = true;
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    next();
    
}
