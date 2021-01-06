/*
 * Primary file for the API
 */

 // Dependencies
 const http = require('http');

 // The server should answer to all requests with a string
let server = http.createServer(function(req,res){
    res.end('Hello from node.js\n');
});

 // start the server
 server.listen(3000, function(){
     console.log('Server is now listening on port 3000');
 })