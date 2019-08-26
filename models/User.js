const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  socketId: {type: String,required: true},
  nickname: String,
  dob: Date
});

module.exports = mongoose.model('User', userSchema);