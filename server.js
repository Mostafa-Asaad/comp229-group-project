#!/usr/bin/env node


/*
 File Name : server.js
 COMP228 - Web Application Developmnet
 Summer 2021 Group 6
 Mighty Bunch

 Developers: 
 Sarabun Tohura - 300685525
 Yerim Cho - 301143325
 Mohammed Husain - 301149144
 Mostafa Asaad - 301173762
 Chaehyun Lee - 301084271
 Viktoriia Romaniuk - 301079072

 Web App Name : Migthy Survey
 Description : Users can create new survey. 
 There are two types of surveys, True or False / Scale.
 Only logged-in users can answer the survey,
 and only the creator of survey can edit / delte the survey. 

*/

/**
 * Module dependencies.
 */

let app = require('./server/config/app');
let debug = require('debug')('portfolio2:server');
let http = require('http');

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
