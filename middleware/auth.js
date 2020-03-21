
//A middleware is just a function that has access to req and res cycle and req and res object.
// Everytime we hit an enpoint we can fire off this middleware.

//CHECK TO SEE IF THERE'S A TOKEN IN THE HEADER TO ACCESS CONTACTS
//TO PROTECT A ROUTE

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res , next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //if no token
    if (!token){
        return res.status(401).json({msg: 'No token.Authorization denied'})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret')); //checking secret

        req.user = decoded.user;//if it verifies 
        //(token is assigned to req.user) SO WE CAN ACCESS IT IN THE ROUTE

        next();
    } catch (error) {
        res.status(401).json({msg: 'token is not valid'})
    }
}