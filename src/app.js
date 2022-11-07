import { Replica } from './game.js';
import Renderer from './renderer.js';
import { keyboard } from './keyboard.js';
import { Codec } from './message.js';
import { Vehicle, Rocket } from './model.js';

const replica = new Replica();
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const renderer = new Renderer(replica, context);
const codec = new Codec({ Vehicle, Rocket });

function loop() {
  replica.move();
  renderer.render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// Initialize server connection
const socket = new WebSocket('ws://localhost:3000/');
// TODO: Send the keyboard messages to the server
// TODO: Handle the message comming from the server
