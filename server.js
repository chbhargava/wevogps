'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

let lat = 17.48036;
let lon = 78.41143;

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    
    wss.clients.forEach((client) => {
      lon += 0.00002 
      client.send(JSON.parse(`{"lat": ${lat}, "lon" : ${lon}}`));
    });
  });
  
  ws.on('close', () => console.log('Client disconnected'));
});

/*
setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);
*/
