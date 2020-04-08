const express = require('express');
const router = express.Router(); // isolated instance of middleware and routes.
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

//route GET endpoint: api/contacts
// get all of the user's contacts
//private
router.get('/', auth, async (req, res) => {
    // res.send('Get all user\'s contacts');
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')

    }
});

//route POST endpoint: api/contacts
// Add new contacts
//private
router.post('/', [auth,
    [
        check('name', 'name is required').not().isEmpty()
    ]
], async (req, res) => {
    // res.send('Add a contact');
    const errors = validationResult(req); //validator
    //if errors
    if (!errors.isEmpty()) {
        //return 400 bad request with errors.User typed wrong data
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })

        const contact = await newContact.save()
        res.json(contact)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

//route PUT endpoint: api/contacts
//update contacts
//private
router.put('/:id', auth, async (req, res) => {
    // res.send('Update contact');
    const { name, email, phone, type } = req.body;

    //Buid contact object:
    const contactField = {};
    if (name) contactField.name = name;
    if (email) contactField.email = email;
    if (phone) contactField.phone = phone;
    if (type) contactField.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        //Make sure user owns contact
        //contact.user not a string //req.user.id is string 
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactField },
            { new: true } //if that contact field doesn't exist create it.
        )
        res.json(contact)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }
});

//route DELETE endpoint: api/contacts
//delete contacts
//private
router.delete('/:id', auth, async (req, res) => {
    // res.send('Delete contact');
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }

        await Contact.findByIdAndRemove(req.params.id)

        res.json({ msg: 'Contact removed!'});

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }

});



module.exports = router; 