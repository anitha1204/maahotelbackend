const mongoose = require('mongoose');

const MaahotelSchema = new mongoose.Schema({
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

const MaahotelDatas = mongoose.model('MaahotelDatas', MaahotelSchema);

module.exports = MaahotelDatas;



