const ChatRoom = require('../models/ChatRooms');
const User = require('../models/User');

module.exports = (io, socket) => {
    socket.on('send_private_message', async (message) => {
        const emitterUser = await User.findOne({ socketId: socket.id });
        const receiverUser = await User.findOne( {socketId: message.receiverId} );

        messageToReceiver = {
            senderSocketId: socket.id,
            text: message.text
        }

        const alreadyinRoom = await ChatRoom.find({
            users: { $all : [emitterUser._id, receiverUser._id] }
        })

        if (alreadyinRoom.length) {
            await ChatRoom.updateOne(
                { id: alreadyinRoom.id},
                { $push: { messages : message.message } },
                (err, raw) => {
                    if(err)
                        console.log(err)
                }
            )
        } else {
            newChatRoom = new ChatRoom({
                name: '', 
                users: [emitterUser.id, receiverUser.id], 
                isPrivateChatRoom: true, 
                messages: [message.message]
            })
            await newChatRoom.save();
            messageToReceiver = { 
                ...messageToReceiver, 
                chatRoomId: newChatRoom.id
            }
        }
        
        io.to(receiverUser.socketId).emit('receive_private_message', messageToReceiver);
    });
}