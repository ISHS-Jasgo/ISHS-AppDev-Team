import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const port = 3001;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('hey', (data) => {
    console.log(`You sended message for ${data} times`);
  });
});

server.listen(port, () => {
  console.log(`Chat server listening on port ${port}`);
});
