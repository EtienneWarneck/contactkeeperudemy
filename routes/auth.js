const express = require('express');
const router = express.Router();

//route GET endpoint: api/auth
//Get logged in user
//private
router.get('/', (req, res) => {
    res.send('Get logged in user');
});


//route POST auth user and get token, public
router.post('/', (req, res) => {
    res.send('Log in user');
});




module.exports = router;