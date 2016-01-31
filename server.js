var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('game'));

app.get('/', function(req, res){
  res.sendFile(__dirname + 'game/index.html');
});

io.on('connection', function(socket){
  console.log('Player connected!');

  socket.on('penUpdate', function(msg){
    socket.broadcast.emit('penUpdate', msg);
  });

  socket.on('disconnect', function(){
    console.log('Player disconnected...');
  });

  socket.on('setLevel', function(msg){
    socket.broadcast.emit('setLevel', msg);
  });

  socket.on('readyUpMobile', function(msg){
    console.log('Mobile ready!');
    socket.broadcast.emit('readyUpMobile', msg);
  });

  socket.on('readyUpDesktop', function(msg){
    console.log('Desktop ready!');
    socket.broadcast.emit('readyUpDesktop', msg);
  });

  socket.on('win', function(msg){
    console.log('win!');
    socket.broadcast.emit('win', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on localhost:3000');
});
