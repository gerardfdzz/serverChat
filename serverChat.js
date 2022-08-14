// We now have an Express server that is listening on port 3000. The socket server is listening for a ‘connection’ event. When an app connects to this server, it can process ‘message’ and ‘disconnect’ events emitted by that app.

// After a ‘message’ event is received by our server, it ‘emits’ or sends an event out to all users connected to this Socket instance. The message, in this case, is a string containing the first two letters of the user’s ID that fired that ‘message’ event together with the message string that that user sent. This ID is automatically generated for us by the Socket server.

const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('a user connected');
    // io.emit('user', `"${socket.id.substr(0, 2)}" has connected!`);

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id.substr(0, 2)}: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected!');
    });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));