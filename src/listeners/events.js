var userSocketMap = {}

const getAllConnectedClients = (roomID, io) => {
    return Array.from(io.sockets.adapter.rooms.get(roomID) || []).map(
        (socketID) => {
            return {
                socketID,
                userName: userSocketMap[socketID],
            };
        }
    );
};

function ConnectSocket(socket, io) {
    var clients = [];
    socket.on("join", ({ roomID, userName }) => {
        userSocketMap[socket.id] = userName;
        socket.join(roomID);
        clients = getAllConnectedClients(roomID, io);
        console.log('clients', clients);
        clients.forEach(({ socketID }) => {
            io.to(socketID).emit("joined", {
                clients,
                userName,
                socketID: socket.id,
            });
        });
    });

    socket.on("code_change", (payload)=> {
        console.log('datatata', payload);
        clients.forEach(({ socketID }) => {
            io.in(socketID).emit("sync_code", {
                data: payload.data
            });
        });
    })
};

module.exports = { ConnectSocket };