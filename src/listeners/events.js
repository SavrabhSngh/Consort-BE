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
    console.log("socket connnected", socket.id);
    socket.on("join", ({ roomID, userName }) => {
        userSocketMap[socket.id] = userName;
        socket.join(roomID);
        const clients = getAllConnectedClients(roomID, io);
        console.log('clients', clients);
        clients.forEach(({ socketID }) => {
            io.to(socketID).emit("joined", {
                clients,
                userName,
                socketID: socket.id,
            });
        });
    });
};

module.exports = { ConnectSocket };