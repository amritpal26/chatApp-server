const User = require('../models/User');

module.exports = (io, socket) => {
    socket.on('disconnect', async () => {
        const userToRemove = await User.findOne( {socketId: socket.id})
        console.log(socket.id)
        console.log()
        if (userToRemove !== null){
            await User.findByIdAndRemove( userToRemove.id, (error) => {
                if (error === null){
                    console.log('user disconnected with userID: ' + userToRemove.id + ' ' + userToRemove.nickname)
                    socket.broadcast.emit('user_disconnected', userToRemove)
                } else{
                    console.log('deleting the user failed.')
                }
            });
        }else {
            console.log('disconnect: userToRemove not found.')
        } 
    });
}