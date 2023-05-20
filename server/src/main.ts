import express, { Request, Response, NextFunction } from 'express';

import { respRest, crespRest } from './rest/rest_producer'
import { logger } from './logging/central_log';

import { cf } from './config/config';

import bodyParser from 'body-parser';
import { Socket } from 'socket.io';

const app = express();

const server = require('http').createServer(app);

const socket: Socket = require('socket.io')(server);

socket.on('connection', (socket: Socket) => {
    logger.info('Socket connected');
    console.log('Socket connected');
    socket.on('disconnect', () => {
        logger.info('Socket disconnected');
    });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('*', (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`Request to '${req.url}' over ${req.method}`);
    next();
});

app.use('/login', require('./routers/login_router'));
app.use('/signup', require('./routers/sign_up_router'));
app.use('/test', require('./routers/test_router'));
app.use('/board', require('./routers/board_router'))

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    let q = req.query.query;
    res.sendFile(__dirname + '/client/index.html');
});

app.get('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('404 Not Found');
});
app.post('*', (req: Request, res: Response, next: NextFunction) => {
    res.header('Content-Type', 'application/json');
    res.status(404).send(crespRest(404));
});

server.listen(80, () => {
    logger.info(`Server started on port ${80}`)
});
