const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Corrected routes without double slashes
router.post('/', bookingController.addBooking); 
router.post('/send-email/:id', bookingController.sendBookingEmail);
router.get('/', bookingController.getBookings);
router.get('/search', bookingController.searchBooking); 
router.get('/:id', bookingController.getBookingById); // Single slash for ':id'
router.put('/:id', bookingController.updateBooking); // Single slash for ':id'
router.delete('/:id', bookingController.deleteBooking); // Single slash for ':id'

module.exports = router;
