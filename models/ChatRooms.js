const mongoose = require('mongoose');

// const ChatMessage = new mongoose.Schema({
//   message: {type: String, required: true},
//   date: Date
// })

const ChatRooms = new mongoose.Schema({
  name: String,
  users: [{ 
    type: mongoose.Schema.ObjectId,
    ref: 'User' ,
  }],
  isPrivateChatRoom: Boolean,
  messages: [{
    type: String
  }],
  chatId: { type: mongoose.Schema.ObjectId, ref: 'Chat'}
});

module.exports = mongoose.model('ChatRoom', ChatRooms);