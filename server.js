const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const cors = require('cors');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
server.listen(process.env.PORT || 5000);

const users = {};

const io= require('socket.io')(server);
io.on('connection', socket => {

    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    }); 
    console.log('new user');
    
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]});

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
})});