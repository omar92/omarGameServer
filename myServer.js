// @ts-check
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var ogs = require('./omarGameServer')(io);
//import ogs  from './omarGameServer';


app.get('/', (req, res) => {
    res.send("online users: " + ogs.onlineUsers)
});



http.listen(3000, () => {
    console.log('listening on *:3000');
});