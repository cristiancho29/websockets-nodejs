"use strict";

const express = require("express");
const app = express(); 
const server = require('http').Server(app);
const io = require('socket.io')(server);
const http = require('http-request');
app.use(express.static('public'));


server.listen(8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
var messages = [{
}];

http.get('https://websockets-example-cristiancho29.c9users.io/api/v1/messages',function(req,res)
    {
        messages=JSON.parse(res.buffer.toString());
        console.log(messages)
    }
);



io.on('connection', (socket)=> {
  console.log('Alguien se ha conectado con Sockets');

  socket.emit('messages', messages);

  socket.on('new-message', (data)=> {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
});
