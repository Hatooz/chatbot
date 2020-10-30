const express = require('express');
const app = express();
const http =  require('http').Server(express);
const socketio = require('socket.io')(http);
const cors = require('cors');


app.use(cors());
//ENABLE CORS
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });
socketio.origins(['https://me-chat.elbizza.me:443']);
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
