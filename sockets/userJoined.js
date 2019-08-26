const User = require('../models/User');

module.exports = (io, socket) => {
    socket.on('join_user', async (user) => {  

        // check if users exist with same nickname.
        const usersWithSameName = await User.findOne({}).where('nickname').equals(user.nickname).countDocuments();
        console.log(usersWithSameName)

        if (usersWithSameName > 0){
            console.log('nickname is already taken')
            socket.emit('nickname_taken', {});
        }else{
            const onlineUser = new User({socketId: socket.id, nickname: user.nickname});
            await onlineUser.save(); 

            const onlineUsers = await User.find({}).where('_id').ne(onlineUser._id).where('nickname').ne(onlineUser.nickname);

            // send to current user who joined.
            socket.emit('user_joined', { onlineUser, onlineUsers });
        
            // send to all other clients except the sender
            socket.broadcast.emit('new_online_user', onlineUser)
            console.log('user joined: ' + onlineUser._id)
        }
    })
};