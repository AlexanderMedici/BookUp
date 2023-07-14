const express = require( "express" ); 
const bodyParser = require( "body-parser" ); 
const cors = require( "cors" ); 
const app = express();
const ports = process.env.PORT || 3000;

app.use( bodyParser.json() );
app.use( cors())
app.use( ( req, res, next ) => {
    res.setHeader( 'Access=Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type , Authorization' );
    next(); 
})

app.listen(ports, ()=> console.log(`Listening on ${ports}`)) 