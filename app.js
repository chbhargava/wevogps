'use strict'

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.status(200).send('Welcome to GPS Tracker')
});

app.get('/update', function(req, res){
    var message = req.query;
    console.log("Got: " + message);
    var loc_time = message.split(":");
    if(loc_time.length < 2) {
        return;
    }
    var location = loc_time[0];
    var arr = location.split(",");
    if(arr.length < 2) {
        return;
    }

    io.emit('position', JSON.parse("{\"lat\": "+arr[0]+", \"lng\" : "+arr[1]+", \"time\": "+loc_time[1]+"}"));
    res.send('Recieved');
});

app.get('/map', function(req, res) {
  res.sendFile(__dirname + '/map.html');
});

var server = http.listen(process.env.PORT || '8080', function() {
  console.log('listening on *:%s', server.address().port);
});


module.exports = app ;