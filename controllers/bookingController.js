// const Booking = require("../models/guestModel");

// // Create Booking
// exports.createBooking = async (req, res) => {
//   try {
//     const newBooking = new Booking(req.body);
//     const savedBooking = await newBooking.save();
//     res.status(201).json(savedBooking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get All Bookings
// exports.getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find();
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Booking by ID
// exports.getBookingById = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     res.status(200).json(booking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Booking
// exports.updateBooking = async (req, res) => {
//   try {
//     const updatedBooking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedBooking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete Booking
// exports.deleteBooking = async (req, res) => {
//   try {
//     await Booking.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Booking deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// const Booking = require('../models/bookingModel');

// // Add a new booking
// const addBooking = async (req, res) => {
//     try {
//         const booking = new Booking(req.body);
//         const savedBooking = await booking.save();
//         res.status(201).json(savedBooking);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Get all bookings
// const getBookings = async (req, res) => {
//     try {
//         const bookings = await Booking.find();
//         res.status(200).json(bookings);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get a specific booking
// const getBookingById = async (req, res) => {
//     try {
//         const booking = await Booking.findById(req.params.id);
//         if (!booking) throw new Error('Booking not found');
//         res.status(200).json(booking);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// };

// // Update a booking
// const updateBooking = async (req, res) => {
//     try {
//         const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
//             new: true, // Returns the updated document
//             runValidators: true, // Ensures validation rules are applied
//         });
//         if (!booking) throw new Error('Booking not found');
//         res.status(200).json(booking);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Delete a booking
// const deleteBooking = async (req, res) => {
//     try {
//         const booking = await Booking.findByIdAndDelete(req.params.id);
//         if (!booking) throw new Error('Booking not found');
//         res.status(200).json({ message: 'Booking deleted successfully' });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// };

// module.exports = { addBooking, getBookings, getBookingById, updateBooking, deleteBooking };


// const Booking = require('../models/bookingModel');

// // Create new company
// exports.addBooking = async (req, res) => {
//     try {
//         const booking = new Booking(req.body);
//         const savedBooking = await booking.save();
//        res.status(201).json(savedBooking);
//     } catch (error) {
//         console.error("Error creating company:", error.message);
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({ errors: Object.values(error.errors).map(err => err.message) });
//         }
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// };

// // Get all companies
// exports.getBookings = async (req, res) => {
//     try {
//         const bookings = await Bookings.find();
//         res.status(200).json(bookings);
//     } catch (error) {
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// };

// // Search companies by name
// // exports.searchCompanies = async (req, res) => {
// //     try {
// //         const { name } = req.query;
// //         const companies = await Company.find({ companyName: new RegExp(name, 'i') });
// //         res.status(200).json(companies);
// //     } catch (error) {
// //         res.status(500).json({ error: 'Server error. Please try again later.' });
// //     }
// // };

// // Get a company by ID
// exports.getBookingById = async (req, res) => {
//     try {
//         const booking = await Booking.findById(req.params.id);
//         if (!booking) return res.status(404).json({ message: 'booking not found' });
//         res.status(200).json(booking);
//     } catch (error) {
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// };

// // Update a company
// exports.updateBooking = async (req, res) => {
//     try {
//         const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
//         res.status(200).json(updatedBooing);
//     } catch (error) {
//         if (error.name === 'ValidationError') {
//             const messages = Object.values(error.errors).map(err => err.message);
//             return res.status(400).json({ errors: messages });
//         }
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// };

// // Delete a company
// exports.deleteBooking = async (req, res) => {
//     try {
//         const result = await Booking.findByIdAndDelete(req.params.id);
//         if (!result) return res.status(404).json({ message: 'Booking not found' });
//         res.status(200).json({ message: 'Booking deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// };



const Booking = require('../models/bookingModel');

// Create new booking
exports.addBooking = async (req, res) => {
    try {
        const booking = new Booking(req.body);
        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        console.error("Error creating booking:", error.message);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                errors: Object.values(error.errors).map(err => err.message),
            });
        }

        // Handle generic server errors
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// Get all bookings
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// Update booking
exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(updatedBooking);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors: messages });
        }
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
    try {
        const result = await Booking.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};
