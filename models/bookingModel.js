// const mongoose = require('mongoose');

// let bookingCounter = 1;

// const bookingSchema = new mongoose.Schema(
//   {
//     sourceOfLooking: { type: String, required: true },
//     bookingPersonName: { type: String, required: true },
//     mobileNumber: {
//       type: String,
//       required: true,
//       validate: {
//         validator: function (v) {
//           return /^[0-9]{10}$/.test(v); // Example: Ensure it's a 10-digit number
//         },
//         message: (props) => `${props.value} is not a valid mobile number!`,
//       },
//     },
//     emailAddress: {
//       type: String,
//       required: true,
//       validate: {
//         validator: function (v) {
//           return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email validation
//         },
//         message: (props) => `${props.value} is not a valid email address!`,
//       },
//     },
//     guestDetails: { type: Number, default: null},
//     acNonac: { type: String, required: true, enum: ['AC', 'Non-AC'] }, // Restrict to valid options
//     roomType: { type: String, required: true },
//     addressDetails: { type: String, required: true },
//     checkInDate: { type: Date, required: true },
//     time: { type: String, required: true },
//     amPm: { type: String, required: true, enum: ['AM', 'PM'] }, // Restrict to valid options
//     extra: { type: String, default: null },
//     gst: { type: String, default: null },
//     bookingPayment:{type: Number, required: true},
//     paymentType: {
//       type: [String], // Change from String to an Array of Strings
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// // Middleware to auto-generate booking ID
// bookingSchema.pre("save", async function (next) {
//   const paddedCounter = bookingCounter.toString().padStart(4, "0");
//   this.bookingId = paddedCounter;
//   bookingCounter++; // Increment counter
//   next();
// });

// module.exports = mongoose.model('Booking', bookingSchema);


const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    sourceOfLooking: { type: String, required: true },
    bookingPersonName: { type: String, required: true },
    mobileNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v); // Example: Ensure it's a 10-digit number
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    emailAddress: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email validation
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    guestDetails: { type: Number, default: null},
    acNonac: { type: String, required: true, enum: ['AC', 'Non-AC'] }, // Restrict to valid options
    roomType: { type: String, required: true },
    addressDetails: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    time: { type: String, required: true },
    amPm: { type: String, required: true, enum: ['AM', 'PM'] }, // Restrict to valid options
    extra: { type: String, default: null },
    gst: { type: String, default: null },
    bookingPayment:{type: Number, required: true},
    paymentType: {
      type: [String], // Change from String to an Array of Strings
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
