// @ts-check
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var ogs = require('./omarGameServer')(io);
//import ogs  from './omarGameServer';


app.get('/', (req, res) => {
    res.send("online users: " + ogs.onlineUsers)
});


let port = process.env.PORT;
if (port == null || port == "") {
  // @ts-ignore
  port = 8000;
}

http.listen(port, () => {
    console.log('listening on *:'+port);
});