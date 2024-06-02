import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const gameData = {
	matrix: [
		['#', '#', '#'],
		['#', '#', '#'],
		['#', '#', '#'],
	]
};

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.send(JSON.stringify(gameData.matrix));

  ws.on('message', function message(data, isBinary) {
	gameData.matrix = JSON.parse(data.toString('utf-8'))
	console.log(gameData.matrix);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});