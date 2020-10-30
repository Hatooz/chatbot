const express = require('express');
const http =  require('http').Server(express);
const socketio = require('socket.io')(http);


socketio.on("connection", socket => {
    console.log("user connected");  
    socket.on('message', function (message) {
        console.log(message);
        socketio.emit('message', message);
    });
})

http.listen(3000, () => {
    console.log("Listening to port 3k");
})
