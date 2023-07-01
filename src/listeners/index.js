const listener = require("./events");

const SocketServer = (io) => {
    io.on("connection", (socket) => {
        console.log('socket', socket.id);
        listener.ConnectSocket(socket, io)
    });

    io.on("disconnecting",  () => {
        console.log('socket disconnecting');
    })
    // DataService.socketInstance.on(SOCKET_DISCONNECTING, () => {
    //     const rooms = [...DataService.socketInstance];
    //     rooms.forEach((roomID) => {
    //       DataService.socketInstance.in(roomID).emit(SOCKET_DISCONNECTED, {
    //         socketID: DataService.socketInstance.id,
    //         userName: "USERNAME",
    //       });
    //     });
    //   });

    io.on("code_change", (data) => {
        console.log('data', data)
    })
};

module.exports = { SocketServer };