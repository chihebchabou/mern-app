const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const User = require('../models/User');

/**
 * @route GET api/contacts
 * @desc Get all users contacts
 * @ccess Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route POST api/contacts
 * @desc Add new contact
 * @ccess Private
 */
router.post(
  '/',
  auth,
  body('name', 'Name is required').notEmpty(),
  body('email', 'Email is not valid').isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route PUT api/contacts/:id
 * @desc Update Contact
 * @ccess Private
 */
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  try {
    console.log(req.params);
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorised' });

    if (name) contact.name = name;
    if (email) contact.email = email;
    if (phone) contact.phone = phone;
    if (type) contact.type = type;

    contact = await contact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route DELETE api/users/:id
 * @desc Delete contact
 * @ccess Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorised' });

    await Contact.deleteOne({ _id: req.params.id });

    res.json({ msg: 'Contact removed' });
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Export module
module.exports = router;
