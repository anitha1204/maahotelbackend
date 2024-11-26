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


const generateBookingId = async () => {
    const lastBooking = await Booking.findOne().sort({ createdAt: -1 }); // Fetch the most recent booking
    if (lastBooking && lastBooking.bookingId) {
        const lastId = parseInt(lastBooking.bookingId, 10); // Convert to integer
        return String(lastId + 1).padStart(4, '0'); // Increment and pad with leading zeros
    }
    return "0001"; // Start from 0001 if no bookings exist
};

// Create new booking
exports.addBooking = async (req, res) => {
    try {
        const bookingId = await generateBookingId(); // Generate the next booking ID
        const bookingData = { ...req.body, bookingId }; // Include booking ID in booking data
        const booking = new Booking(bookingData);
        const savedBooking = await booking.save();

        console.log("Booking saved successfully:", savedBooking);

        // Send booking confirmation email
        await send(
            savedBooking.bookingId, // Include booking ID
            savedBooking.bookingPersonName,
            savedBooking.mobileNumber,
            savedBooking.emailAddress,
            savedBooking.guestDetails,
            savedBooking.acNonac,
            savedBooking.roomType,
            savedBooking.addressDetails,
            savedBooking.checkInDate,
            savedBooking.time,
            savedBooking.amPm,
            savedBooking.roomRent,
            savedBooking.gst,
            savedBooking.bookingPayment,
            savedBooking.paymentType
        );

        // Send notification email to hotel
        await sendNotificationEmail(savedBooking.bookingId, savedBooking.bookingPersonName);

        res.status(201).json(savedBooking);
    } catch (error) {
        console.error("Error creating booking:", error.message);

        // Handle validation errors
        if (error.name === "ValidationError") {
            return res.status(400).json({
                errors: Object.values(error.errors).map((err) => err.message),
            });
        }

        // Handle generic server errors
        res.status(500).json({ error: "Server error. Please try again later." });
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


// Search bookings by booking person name or booking ID
exports.searchBookings = async (req, res) => {
    try {
        const { query } = req.query;
        
        // Validate that the query is not empty
        if (!query) {
            return res.status(400).json({ error: 'Booking ID is required.' });
        }

        // Search specifically by booking ID (case-insensitive)
        const bookings = await Booking.find({ 
            bookingId: new RegExp(query, 'i') 
        });

        // If no bookings found
        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found with this Booking ID.' });
        }

        // Return found bookings
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error searching bookings:', error.message);
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



const createTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "selvam12042003@gmail.com", // Your Gmail address
            pass: "jxjj csdq qked wrku", // Your Google App Password
        },
    });
};


const send = async (
    bookingId,
    bookingPersonName,
    mobileNumber,
    emailAddress,
    guestDetails,
    acNonac,
    roomType,
    addressDetails,
    checkInDate,
    time,
    amPm,
    roomRent,
    gst,
    bookingPayment,
    paymentType
) => {
    try {
        console.log(`Attempting to send confirmation email to ${emailAddress}`);
        const transporter = createTransporter();

        const mailOptions = {
            from: "selvam12042003@gmail.com",
            to: emailAddress,
            subject: `Booking Confirmation - Maa Hotels (ID: ${bookingId})`,
            text: `
            Dear ${bookingPersonName},

            Thank you for booking with Maa Hotels. Here are your booking details:

            - Booking ID: ${bookingId}
            - Name: ${bookingPersonName}
            - Phone: ${mobileNumber}
            - Email: ${emailAddress}
            - Address: ${addressDetails}
            - Guests: ${guestDetails}
            - AC/Non-AC: ${acNonac}
            - Room Type: ${roomType}
            - Check-in Date: ${checkInDate}
            - Time: ${time} ${amPm}
            - Room Rent: ${roomRent} (GST: ${gst})
            - Booking Payment: ${bookingPayment}
            - Payment Type: ${paymentType.join(", ")}

            We look forward to hosting you.

            Regards,
            Maa Hotels
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email successfully sent to ${emailAddress}`);
    } catch (error) {
        console.error(`Error sending confirmation email to ${emailAddress}:`, error.message);
    }
};

// Updated notification email to include booking ID
const sendNotificationEmail = async (bookingId, bookingPersonName) => {
    try {
        console.log("Attempting to send notification email to hotel team");
        const transporter = createTransporter();

        const mailOptions = {
            from: "selvam12042003@gmail.com",
            to: "selvam12042003@gmail.com", // Hotel's email address
            subject: `New Booking Notification (ID: ${bookingId})`,
            text: `
            Dear Hotel Team,

            A new booking has been made:

            - Booking ID: ${bookingId}
            - Guest Name: ${bookingPersonName}

            Please check the admin panel for more details.

            Best regards,
            Maa Hotels
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Notification email successfully sent to hotel team");
    } catch (error) {
        console.error("Error sending notification email:", error.message);
    }
};