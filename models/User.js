
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiry: {
    type: Date,
  },
}, {
  timestamps: true,
});

const UsersDatas = mongoose.model('UsersDatas', usersSchema);

module.exports = UsersDatas;



