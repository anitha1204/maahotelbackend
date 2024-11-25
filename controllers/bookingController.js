// const Booking = require('../models/bookingModel');

// // Create new booking
// exports.addBooking = async (req, res) => {
//     try {
//         const booking = new Booking(req.body);
//         const savedBooking = await booking.save();
//         res.status(201).json(savedBooking);
//     } catch (error) {
//         console.error("Error creating booking:", error.message);
        
//         // Handle validation errors
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({
//                 errors: Object.values(error.errors).map(err => err.message),
//             });
//         }

//         // Handle generic server errors
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// };

// // Get all bookings
// exports.getBookings = async (req, res) => {
//     try {
//         const bookings = await Booking.find();
//         res.status(200).json(bookings);
//     } catch (error) {
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// };

// // Get booking by ID
// exports.getBookingById = async (req, res) => {
//     try {
//         const booking = await Booking.findById(req.params.id);
//         if (!booking) return res.status(404).json({ message: 'Booking not found' });
//         res.status(200).json(booking);
//     } catch (error) {
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// };

// // Update booking
// exports.updateBooking = async (req, res) => {
//     try {
//         const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
//         res.status(200).json(updatedBooking);
//     } catch (error) {
//         if (error.name === 'ValidationError') {
//             const messages = Object.values(error.errors).map(err => err.message);
//             return res.status(400).json({ errors: messages });
//         }
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// };

// // Delete booking
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
const nodemailer = require("nodemailer");


const createTransporter = () => {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  };
  
  // Function to send confirmation email to the user
  const sendConfirmationEmail = async (booking) => {
    try {
      const transporter = createTransporter();
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: booking.emailAddress,
        subject: "Booking Confirmation - Maa Hotels",
        text: `
          Dear ${booking.bookingPersonName},
  
          Thank you for booking with us!
          Booking Details:
          - Booking ID: ${booking.bookingId}
          - Name: ${booking.bookingPersonName}
          - Phone: ${booking.mobileNumber}
          - Email: ${booking.emailAddress}
          - Room Type: ${booking.roomType}
          - AC/Non-AC: ${booking.acNonac}
          - Payment: ${booking.bookingPayment}
          - Payment Type: ${booking.paymentType.join(", ")}
  
          Regards,
          Maa Hotels
        `,
      };
      await transporter.sendMail(mailOptions);
      console.log("Confirmation email sent successfully.");
    } catch (error) {
      console.error("Error sending confirmation email:", error.message);
    }
  };
  
  // Function to send notification email to the hotel
  const sendNotificationEmail = async (booking) => {
    try {
      const transporter = createTransporter();
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_USERNAME, // Replace with the hotel's email address
        subject: "New Booking Notification",
        text: `
          New Booking Received:
          - Booking ID: ${booking.bookingId}
          - Name: ${booking.bookingPersonName}
          - Phone: ${booking.mobileNumber}
          - Email: ${booking.emailAddress}
          - Room Type: ${booking.roomType}
          - AC/Non-AC: ${booking.acNonac}
          - Payment: ${booking.bookingPayment}
          - Payment Type: ${booking.paymentType.join(", ")}
  
          Please prepare accordingly.
        `,
      };
      await transporter.sendMail(mailOptions);
      console.log("Notification email sent successfully.");
    } catch (error) {
      console.error("Error sending notification email:", error.message);
    }
  };

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
         
        // Send emails
    await sendConfirmationEmail(savedBooking);
    await sendNotificationEmail(savedBooking);

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


