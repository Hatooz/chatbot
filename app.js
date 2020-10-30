
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose')
const Message = require('./models/Message')
const bodyParser = require('body-parser')

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to db')
})

io.origins('*:*');
io.on("connection", socket => {
    Message.find()
    .then((data) => {
        console.log(data)
        io.emit('restore', data);
    });
    
    console.log("user connected");  
    socket.on('message', function (message) {
        const msg = new Message({
            nick: message.nick,
            text: message.text,
            time: message.time
        })
        msg.save();        
        io.emit('message', message);
    });
})



//ROUTES
// app.get('/message', async (req, res) => {
//     try {
//         const posts = await Message.find();
//         res.json(posts)
//     } catch (error) {
//         res.json({message: error})
//     }
// })
// app.post('/message', (req,res) => {
//     const message = new Message({
//         nick: req.body.nick,
//         text: req.body.text,
//         time: req.body.time
//     })
//     message.save()    
//     .then(data => {
//         res.json(data);
//     })
// })








server.listen(3000, () => {
    console.log("Listening to port 3k");
})
