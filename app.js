'use strict'

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.status(200).send('Welcome to GPS Tracker')
});

let lat = 17.48036;
let lon = 78.41143;

app.post('/update', function(req, res){
    console.log(req.body);

    // io.emit('position', JSON.parse(`{"lat": ${lat}, "lon" : ${lon}}`));
    res.send('Recieved');
});

app.get('/map', function(req, res) {
  res.sendFile(__dirname + '/map.html');
});

var server = http.listen(process.env.PORT || '8080', function() {
  console.log('listening on *:%s', server.address().port);
});


module.exports = app ;