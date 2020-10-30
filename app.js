
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// io.origins(['https://me-vue.elbizza.me/#/chat']);
io.on("connection", socket => {
    console.log("user connected");  
    socket.on('message', function (message) {
        console.log(message);
        io.emit('message', message);
    });
})

// server.listen(3000, () => {
//     console.log("Listening to port 3k");
// })
