// HTTP PORTION

var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	// console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
}

// WEBSOCKET PORTION
var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {
	
		console.log("We have a new client: " + socket.id);
		
		///MY SOCKET EVENTS HERE
		socket.on('orientation', function(data){
			// console.log(data);
			console.log('mobile one connected');
			//socket emit to everyone 
			
			socket.broadcast.emit('getData', data);
		});

		socket.on('orientation2', function(data){
			console.log('mobile two connected');
			// console.log(data);
			//socket emit to everyone 
			
			socket.broadcast.emit('getData2', data);
		});

		socket.on('orientation3', function(data){
			console.log('mobile three connected');
			// console.log(data);
			//socket emit to everyone 
			
			socket.broadcast.emit('getData3', data);
		});

		socket.on('orientation4', function(data){
			console.log('mobile four connected');
			// console.log(data);
			//socket emit to everyone 
			
			socket.broadcast.emit('getData4', data);
		});


		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);