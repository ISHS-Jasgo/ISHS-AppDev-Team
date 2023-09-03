import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
///

const app = express();
app.use(cors());

const server = http.createServer(app);
server.listen(3001, () => {
  console.log('listening on *:3001');
});

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const apiUrl = 'http://localhost:3000';
const chat = io.of('/chat');

chat.on('connection', async (socket) => {
  console.log('a user connected');

  socket.on('revalidate', async () => {
    console.log('revalidate');
    const chatRooms = await (await fetch(`${apiUrl}/api/chat/find`)).json();
    io.of('chat').emit('revalidate', chatRooms);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
