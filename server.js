import express from 'express';
import expressWs from 'express-ws';
import { Game } from './src/game.js';
import { Codec } from './src/message.js';

const app = express();
expressWs(app);

// The sockets of the connected players
let sockets = [];
const codec = new Codec();

// Initialize the game
const game = new Game((message) => {
  // TODO: Broadcast the message to the connected browsers
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
  // TODO: create a player for each websocket connection
  // TODO: handle keyboard messages comming from the connected browsers
  // TODO: ensure that the player quit the game when the connection closes
});

app.listen(3000);
