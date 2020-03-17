const express = require('express');
const router = express.Router();

//route GET endpoint: api/contacts
// get all of the user's contacts
//private
router.get('/', (req, res) => {
    res.send('Get all user\'s contacts');
});

//route POST endpoint: api/contacts
// Add new contacts
//private
router.post('/', (req, res) => {
    res.send('Add a contact');
});

//route PUT endpoint: api/contacts
//update contacts
//private
router.put('/:id', (req, res) => {
    res.send('Update contact');
});

//route DELETE endpoint: api/contacts
//delete contacts
//private
router.delete('/:id', (req, res) => {
    res.send('Delete contact');
});



module.exports = router;