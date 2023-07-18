const express = require( "express" ); 
const bodyParser = require( "body-parser" );
const authRoutes = require( "./routes/auth" ); 
const errorController = require( "./controllers/error" ); 
const cors = require( "cors" ); 
const app = express();
const ports = process.env.PORT || 3000;

app.use( bodyParser.json() );
app.use( cors())
app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type , Authorization' );
    next(); 
})
app.use( "/auth", authRoutes )
// if there is an error failed auth login 404 it
app.use = ( errorController.get404 );
// not found error 
app.use = ( errorController.get500 );  
app.listen(ports, ()=> console.log(`Listening on ${ports}`)) 