/**
 * Setup a server that allows the app to be loaded at any valid route URL
 * but still serve other static content.
 */

var serverFactory = require('spa-server');
var matcher = /\/person/; 
var server = serverFactory.create({
  port: process.env.PORT || 8080,
  
  /**
   * This method is called when a file is requested that doesn't exist thus
   * we don't have to check for / or /index.html. The only other valid app
   * routes start with /person. Anything else is a 404.
   */
  fallback: function(request, response){
    if(matcher.test(request.url)){
      return '/index.html';
    } else {
      return null;
    }
  }
});
 
server.start();