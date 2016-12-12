/**
 * Setup a server that allows the app to be loaded at any valid route URL
 * but still serve other static content.
 */

var serverFactory = require('spa-server');
var matcher = /\/person\//; 
var server = serverFactory.create({
  port: process.env.PORT || 8080,
  fallback: function(request, response){
    if(matcher.test(request.url)){
      return '/index.html';
    } else {
      return null;
    }
  }
});
 
server.start();