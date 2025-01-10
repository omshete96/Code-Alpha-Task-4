const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const documentRoutes = require('./routes/documentRoutes');
const { handleSocket } = require('./socketHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/collaborativeEditor', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});

// Routes
app.use('/api/documents', documentRoutes);

// WebSocket Handling
handleSocket(io);

// Start server
server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
