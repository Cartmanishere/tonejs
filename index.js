var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// middleware
app.use(express.static('static'))

app.get('/player', function(req, res){
  res.sendFile(__dirname + '/static/player.html');
});

app.get('/controller', function(req, res){
  res.sendFile(__dirname + '/static/controller.html');
});

io.on('connection', function(socket){
    console.log('Connection received!')
  // Received a connection

  // Setup a note transfer connection between controller and player
    socket.on('controller', function(message){
        io.emit('player', { note: message.note, duration: message.duration });
    });





    socket.on('disconnect', function(){
       console.log('Someone disconnected.')
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});