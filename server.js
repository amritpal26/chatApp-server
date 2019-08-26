const createError = require('http-errors');
const path = require('path')
const mongoose = require('mongoose');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const keys = require('./config/keys')

// Connect to the database.
mongoose.connect(keys.mongoUri, keys.mongoOptions, (error) => {
    if (error != null || error != undefined)
        console.log('error connecting to the database: ' + error);
    else 
        console.log('db connected')});
mongoose.set('useFindAndModify', false);
// Socket.
io.on('connection', async (socket) =>{
    console.log(socket.id)
    require('./sockets/userJoined')(io, socket);
    require('./sockets/chatRoomMessage')(io, socket);
    require('./sockets/joinPrivateRoom')(io, socket);
    require('./sockets/privateMessage')(io, socket);
    require('./sockets/disconnect')(io, socket);
});

// TODO
app.get('/', (req, res) => { res.sendFile(path.join(__dirname + '/../client/public/index.html'))});
app.get('*', (req, res) => { res.status(404).send('something went wrong.')})

// catch 404 error and forward to error handler.
app.use((request, response, next) => {
    next(createError(404));
})

// Error handler
app.use((error, req, res, next) => {
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    //sending error
    res.status(error.status || 500).send(error);
});

module.exports = { app, server }