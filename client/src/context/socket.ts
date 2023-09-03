import React from 'react';
import SocketIOClient from 'socket.io-client';

const socketUrl = 'http://localhost:3001/chat';

export const socket = SocketIOClient(socketUrl, { transports: ['websocket'] });
export const SocketContext = React.createContext(socket);
