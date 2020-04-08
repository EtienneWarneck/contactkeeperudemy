const express = require('express');
const router = express.Router();//isolated instance of middleware and routes

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//bring password for jwt:
const config = require('config')

const auth = require('../middleware/auth')//MIDDLEWARE * to protect route 

//npm install --save express-validator
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

//router.METHOD() provides the routing functionnality



//route GET endpoint: api/auth ---------------------------------------------
//Get logged in user //Need token to get access to this route.
//private 
//protected  
//BY ADDING AUTH IT RUNS THE MIDDLEWARE *
router.get('/', auth, async (req, res) => {
    //route POST auth user and get token, public
    // res.send('Get logged in user');

    try { //if correct token and loged in, 
        //the req object will have a user object attached
        //with correct user id
        const user = await User.findById(req.user.id).select('-password'); //mongoose method id but nor password

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// AUTHENTICATION user
// route POST endpoint: api/auth ---------------------------------------------
// Auth user and get token
// public
// requires middleware to compare token
router.post('/',
    [
        check('email').isEmail(), //validator
        check('password').exists(),//validator
    ],
    async (req, res) => { //async for Mongoose and bcrypt
        const errors = validationResult(req);

        if (!errors.isEmpty()) { //if error
            //return 400 bad request with array of errors
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email }) //returns promise with...

            if (!user) { //if user email doesn't exists VALIDATION
                return res.status(400).json({ msg: 'email not found or invalid credential' })
            }

            //if there is a user , use the bcrypt compare method to compare with user password
            const isMatch = await bcrypt.compare(password, user.password)
            //return true or fontVariantAlternates: 

            if (!isMatch) { //if password doesn't match
                return res.status(400).json('Password doesn\'t match')
            }

            const payload = {
                user: { id: user.id } ///...the user's id
            }
            jwt.sign(payload, config.get('jwtSecret'), //passing into jwt wit the secret 
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token }); //token includes user's id !
                }
            );
        } catch (err) {
            console.error(err.message); //
            res.status(500).send('Server error');
            // res.send('Log in user');
        }
    }
);

module.exports = router;