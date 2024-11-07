const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  bookingNo: { 
    type: String, 
    required: [true, 'Booking number is required'] 
  },
  name: { 
    type: String, 
    required: [true, 'Guest name is required'] 
  },
  roomNo: { 
    type: String, 
    required: [true, 'Room number is required'] 
  },
  roomType: { 
    type: String, 
    required: [true, 'Room type is required'] 
  },
  ac: { 
    type: String, 
    required: [true, 'AC information is required'] 
  },
  reservationTill: { 
    type: String, 
    required: [true, 'Reservation date is required'],
    validate: {
      validator: v => /^\d{4}-\d{2}-\d{2}$/.test(v),
      message: props => `Invalid date format for reservation: ${props.value}. Use YYYY-MM-DD format.`
    }
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: props => `Invalid phone number: ${props.value}. It should be 10 digits.`
    }
  },
  address: { 
    type: String, 
    required: [true, 'Address is required'], 
    maxlength: [100, 'Address cannot exceed 100 characters']
  },
  idNumber: { 
    type: String, 
    required: [true, 'ID number is required'] 
  },
  noOfGuests: { 
    type: Number, 
    required: [true, 'Number of guests is required'], 
    min: [1, 'At least one guest is required']
  },
  checkInTime: { 
    type: String, 
    required: [true, 'Check-in time is required'] 
  },
  checkOutTime: { 
    type: String, 
    required: [true, 'Check-out time is required'] 
  },
  roomNights: { 
    type: Number, 
    required: [true, 'Room nights are required'], 
    min: [1, 'At least one room night is required']
  },
  rate: { 
    type: Number, 
    required: [true, 'Rate per night is required'], 
    min: [0, 'Rate must be a positive number']
  },
  totalRoomRent: { 
    type: Number, 
    required: [true, 'Total room rent is required'], 
    min: [0, 'Total room rent must be a positive number']
  },
  gstRequired: { 
    type: String, 
    required: [true, 'GST requirement status is required'] 
  },
  gstAmount: { 
    type: Number, 
    required: [true, 'GST amount is required'], 
    min: [0, 'GST amount must be a positive number']
  },
  totalAmountPayable: { 
    type: Number, 
    required: [true, 'Total amount payable is required'], 
    min: [0, 'Total amount payable must be a positive number']
  },
  advance: { 
    type: Number, 
    required: [true, 'Advance amount is required'], 
    min: [0, 'Advance amount must be a positive number']
  },
  outstanding: { 
    type: Number, 
    required: [true, 'Outstanding amount is required'], 
    min: [0, 'Outstanding amount must be a positive number']
  },
  shiftingCharges: { 
    type: Number, 
    required: [true, 'Shifting charges are required'], 
    min: [0, 'Shifting charges must be a positive number']
  },
  balance: { 
    type: Number, 
    required: [true, 'Balance is required'], 
    min: [0, 'Balance must be a positive number']
  },
  clientPaid: { 
    type: String, 
    required: [true, 'Client payment status is required'] 
  },
  advanceReturn: { 
    type: Number, 
    required: [true, 'Advance return is required'], 
    min: [0, 'Advance return must be a positive number']
  },
  modeOfPayment: { 
    type: String, 
    required: [true, 'Mode of payment is required'] 
  },
  status: { 
    type: String, 
    required: [true, 'Booking status is required'] 
  }
}, { timestamps: true });

module.exports = mongoose.model('Guest', guestSchema);
