const listener = require("./events");

const SocketServer = (io) => {
    io.on("connection", (socket) => {
        console.log('socket', socket.id);
        listener.ConnectSocket(socket, io)
    });
};

module.exports = { SocketServer };