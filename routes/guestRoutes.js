const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

// Create a new guest
router.post('/guests', guestController.createGuest);

// Get all guests
router.get('/guests', guestController.getAllGuests);

// Get a guest by booking number
router.get('/guests/:bookingNo', guestController.getGuestByBookingNo);

// Update a guest by booking number
router.put('/guests/:bookingNo', guestController.updateGuest);

// Delete a guest by booking number
router.delete('/guests/:bookingNo', guestController.deleteGuest);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const guestController = require('../controllers/guestController');

// // Create a new guest
// router.post('/guests', guestController.createGuest);

// // Get all guests
// router.get('/guests', guestController.getAllGuests);

// // Get a guest by booking number
// router.get('/guests/:id', guestController.getGuestByBookingNo);

// // Update a guest by booking number
// router.put('/guests/:id', guestController.updateGuest);

// // Delete a guest by booking number
// router.delete('/guests/:id', guestController.deleteGuest);

// module.exports = router;
