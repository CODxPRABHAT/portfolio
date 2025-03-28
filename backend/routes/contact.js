const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// POST /api/contact - Handle contact form submissions
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Here you would typically:
    // 1. Validate the input
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // 2. Send an email (you'll need to set up an email service)
    // For now, we'll just log the message
    console.log('Contact form submission:', { name, email, message });

    // 3. Send success response
    res.status(200).json({ message: 'Message received! Thank you for contacting us.' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

// Get all contact submissions (protected route)
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 