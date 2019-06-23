import socketio from 'socket.io';
let io = {};
let client = {};

const socketServer = (server) => {
    io = socketio.listen(server);
    // configure

    io.on('connection', (client) => {
        // sending to the client
        client.emit('hello', 'can you hear me?', 1, 2, 'abc');
        console.log(io.engine.clientsCount);
        // sending to all clients except sender
        client.broadcast.emit('broadcast', 'hello friends!');
        client.on('register', () => {
            console.log('register');
        });
        client.on('join', () => {
            console.log('join');
        });
        client.on('event', (data) => {
            console.log('connect', data);
        });
        client.on('disconnect', () => {
            console.log('disconnect');
        });
    });
};

// const chat = io.of('/chat').on('connection', (socket) => {
//     socket.emit('a message', {
//         that: 'only',
//         '/chat': 'will get'
//     });
//     chat.emit('a message', {
//         everyone: 'in',
//         '/chat': 'will get'
//     });
// });
export default socketServer;
