
const express = require('express');
const app = express();

const cors = require('cors');


const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors());


io.origins(['https://me-chat.elbizza.me/']);
io.on("connection", socket => {
    console.log("user connected");  
    socket.on('message', function (message) {
        console.log(message);
        io.emit('message', message);
    });
})

server.listen(3000, () => {
    console.log("Listening to port 3k");
})
