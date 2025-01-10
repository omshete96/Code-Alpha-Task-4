let users = [];

const handleSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        
        // When a user joins the document
        socket.on('joinDocument', (documentId) => {
            console.log(`User ${socket.id} joined document ${documentId}`);
            users.push({ socketId: socket.id, documentId });
            io.emit('userList', users.filter(user => user.documentId === documentId));
        });

        // Handle document editing in real-time
        socket.on('editDocument', (data) => {
            socket.broadcast.emit('editDocument', data);
        });

        // Handle cursor movement
        socket.on('cursorMove', (data) => {
            socket.broadcast.emit('cursorMove', data);
        });

        // When a user disconnects
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            users = users.filter(user => user.socketId !== socket.id);
        });
    });
};

module.exports = { handleSocket };
