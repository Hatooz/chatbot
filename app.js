
const express = require('express');
const app = express();
const cors = require('cors');
// app.use(cors());


const server = require('http').createServer(app);
const io = require('socket.io')(server, { origins: '*:*'});


// app.use(function(request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*:*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
//   });

  io.origins((origin, callback) => {
    if (origin !== 'https://me-vue.elbizza.me') {
      return callback('origin not allowed', false);
    }
    callback(null, true);
  });

// io.origins(['https://me-vue.elbizza.me/#/chat']);
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
