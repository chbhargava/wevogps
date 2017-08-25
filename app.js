'use strict'

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.status(200).send('Welcome to GPS Tracker')
});

app.get('/update', function(req, res){
    console.log("Lat: " + req.query.lat);
    console.log("Lon: " + req.query.lon);

    io.emit('position', JSON.parse("{\"lat\": "+req.query.lat+", \"lon\" : "+req.query.lon+"}"));
    res.send('Recieved');
});

app.get('/map', function(req, res) {
  res.sendFile(__dirname + '/map.html');
});

var server = http.listen(process.env.PORT || '8080', function() {
  console.log('listening on *:%s', server.address().port);
});


module.exports = app ;