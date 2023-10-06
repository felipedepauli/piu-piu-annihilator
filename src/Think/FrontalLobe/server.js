// Importing required libraries
const fs = require('fs').promises;
const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const apiRoutes = require('./api');
const cors = require('cors')

// Setting up express app and enabling CORS
const app = express()
app.use(cors())
app.use(express.static("public"))
app.use(express.static("../../../../media"))

app.use('/', apiRoutes);
// Setting up express to use JSON and API routes
app.use(express.json());


// Starting API server
app.listen(8081, () => console.log(`API listening on port 8081...`));

// Creating HTTP server
const server = http.createServer();

// Creating WebSocket server associated with HTTP server for web client
const wssWeb = new WebSocket.Server({ noServer: true });

// Creating WebSocket server associated with HTTP server for Python client
const wssPython = new WebSocket.Server({ noServer: true });

// Counter for the number of connections
let connectionCount = 0;

// Variable to keep track of the connection status
let connected;
let webSocket;

// Event for Web Client Connection
wssWeb.on('connection', (ws) => {
  webSocket = ws;
  console.log('Web client connected');
});

// Event for Python Client Connection
wssPython.on('connection', (ws) => {
  connected = true;
  
  // Increment the connection count
  // Only allow one connection at a time
  connectionCount++;
  if (connectionCount > 1) {
    wssPython.close();
    return;
  }

  console.log('Python client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    // Decoding the image
    const imgBuffer = Buffer.from(data.frame, 'base64');
    // Send the image as a base64 string to the web client
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(imgBuffer.toString('base64'));
    }
  });
  
  // ON CLOSE Event
  // This event triggers when the Python client disconnects from the server
  ws.on('close', () => {
    console.log('Python client disconnected');
    connected = false;
    connectionCount--;
  });
});

// Handle upgrade of requests for different paths
server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = new URL(request.url, 'http://localhost').pathname;

  if (pathname === '/web') {
    wssWeb.handleUpgrade(request, socket, head, function done(ws) {
      wssWeb.emit('connection', ws, request);
    });
  } else if (pathname === '/python') {
    wssPython.handleUpgrade(request, socket, head, function done(ws) {
      wssPython.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

// Start listening on the specified port
server.listen(8080, () => {
  console.log('Streaming listening on http://192.168.137.1:8080');
});
