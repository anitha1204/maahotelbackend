const Guest = require('../models/guestModel');

// Create a new guest
exports.createGuest = async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).json({ message: 'Guest created successfully', guest });
  } catch (error) {
    res.status(400).json({ message: 'Error creating guest', error: error.message });
  }
};

// Get all guests
exports.getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving guests', error: error.message });
  }
};

// Get a guest by booking number
exports.getGuestByBookingNo = async (req, res) => {
  try {
    const guest = await Guest.findOne({ bookingNo: req.params.bookingNo });
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving guest', error: error.message });
  }
};

// Update a guest by booking number
exports.updateGuest = async (req, res) => {
  try {
    const guest = await Guest.findOneAndUpdate(
      { bookingNo: req.params.bookingNo },
      req.body,
      { new: true }
    );
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    res.status(200).json({ message: 'Guest updated successfully', guest });
  } catch (error) {
    res.status(400).json({ message: 'Error updating guest', error: error.message });
  }
};

// Delete a guest by booking number
exports.deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findOneAndDelete({ bookingNo: req.params.bookingNo });
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    res.status(200).json({ message: 'Guest deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting guest', error: error.message });
  }
};



// const Guest = require('../models/guestModel');

// // Create a new guest
// exports.createGuest = async (req, res) => {
//   try {
//     const guest = new Guest(req.body);
//     await guest.save();
//     res.status(201).json({ message: 'Guest created successfully', guest });
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating guest', error: error.message });
//   }
// };

// // Get all guests
// exports.getAllGuests = async (req, res) => {
//   try {
//     const guests = await Guest.find();
//     res.status(200).json(guests);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving guests', error: error.message });
//   }
// };

// // Get a guest by booking number
// exports.getGuestByBookingNo = async (req, res) => {
//   try {
//     const guest = await Guest.findOne({ bookingNumber: req.params.id });
//     if (!guest) {
//       return res.status(404).json({ message: 'Guest not found' });
//     }
//     res.status(200).json(guest);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving guest', error: error.message });
//   }
// };

// // Update a guest by booking number
// exports.updateGuest = async (req, res) => {
//   try {
//     const guest = await Guest.findOneAndUpdate(
//       { bookingNumber: req.params.id },
//       req.body,
//       { new: true }
//     );
//     if (!guest) {
//       return res.status(404).json({ message: 'Guest not found' });
//     }
//     res.status(200).json({ message: 'Guest updated successfully', guest });
//   } catch (error) {
//     res.status(400).json({ message: 'Error updating guest', error: error.message });
//   }
// };

// // Delete a guest by booking number
// exports.deleteGuest = async (req, res) => {
//   try {
//     const guest = await Guest.findOneAndDelete({ bookingNumber: req.params.id });
//     if (!guest) {
//       return res.status(404).json({ message: 'Guest not found' });
//     }
//     res.status(200).json({ message: 'Guest deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting guest', error: error.message });
//   }
// };
