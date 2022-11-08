import express from 'express';
import expressWs from 'express-ws';
import { Game } from './src/game.js';
import { Codec } from './src/message.js';
import { Rocket, Vehicle } from './src/model.js';

const app = express();
expressWs(app);

// The sockets of the connected players
const sockets = [];
const codec = new Codec();

// Initialize the game
const game = new Game((message) => {
  sockets.forEach((socket) => {
    socket.send(codec.encode(message));
  });
});

setInterval(() => {
  game.move();
}, 10);

// Serve the public directory
app.use(express.static('public'));

// Serve the src directory
app.use('/src', express.static('src'));

// Serve the src directory
app.use('/test', express.static('test'));

// Serve the jsdoc directory
app.use('/doc', express.static('out'));

// Serve the dist directory
app.use('/dist', express.static('dist'));

// Websocket game events
app.ws('/', (socket) => {
  sockets.push(socket);
  const id = game.join();
  socket.on('close', () => {
    sockets = sockets.filter(s => s !== socket);
    game.quit(id);
  });
  socket.on('message', (data) => {
    game.onMessage(id, codec.decode(data));
  });
});

app.listen(3000);
