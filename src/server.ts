import * as http from 'http';
import * as websocket from 'ws';

const server = http.createServer( (req, res) => {
	res.end('I\'m connected');
});
server.listen(5500);

const socket = new websocket.Server({server});
socket.on('connection', (ws) => {
	ws.on('message', (message) => {
		console.log('received %s', message);
	});
	ws.send('send to client');
});
