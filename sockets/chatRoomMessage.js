const ChatRoom  = require('../models/ChatRooms')
const User  = require('../models/User')

module.exports = (io, socket) => {
    io.on('connection', async (msg) => {
        // const user = await User.findOne({ socketId: socket.id });
        // io.emit('group message', { nickname: user.nickname, message: msg })
    });
}
