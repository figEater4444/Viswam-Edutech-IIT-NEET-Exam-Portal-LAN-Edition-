const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A student connected:', socket.id);

    // Listen for tab switch alerts from students
    socket.on('tab-switched', (data) => {
        console.log(`Student ${data.name} switched tabs! Total: ${data.count}`);
        // Broadcast to a potential "Teacher Dashboard"
        io.emit('admin-alert', data);
    });
});

// Replace '0.0.0.0' to allow any device on your Wi-Fi to connect
const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Exam Portal running at http:// 192.168.10.146:${PORT}`);
});
