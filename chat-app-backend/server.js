const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const rooms = new Map();

wss.on('connection', (ws) => {
  let currentRoom = null;
  let username = null;

  ws.on('message', (data) => {
    const message = JSON.parse(data);
    
    switch (message.type) {
      case 'join':
        username = message.username;
        currentRoom = message.roomCode;
        
        if (!rooms.has(currentRoom)) {
          rooms.set(currentRoom, new Set());
        }
        
        rooms.get(currentRoom).add(username);
        broadcastUserList(currentRoom);
        break;
        
      case 'message':
        if (rooms.get(currentRoom)?.size > 1) {
          broadcastMessage(currentRoom, username, message.text);
        }
        break;
        
      case 'leave':
        leaveRoom();
        break;
    }
  });

  ws.on('close', () => {
    leaveRoom();
  });

  function leaveRoom() {
    if (currentRoom && username && rooms.has(currentRoom)) {
      rooms.get(currentRoom).delete(username);
      
      if (rooms.get(currentRoom).size === 0) {
        rooms.delete(currentRoom);
      } else {
        broadcastUserList(currentRoom);
      }
    }
    currentRoom = null;
    username = null;
  }

  function broadcastUserList(roomCode) {
    const users = Array.from(rooms.get(roomCode));
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'userList',
          users,
          count: users.length
        }));
      }
    });
  }

  function broadcastMessage(roomCode, sender, text) {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'message',
          room: roomCode,
          username: sender,
          text,
          timestamp: new Date().toISOString()
        }));
      }
    });
  }
});

function generateRoomCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

server.listen(3001, () => {
  console.log('WebSocket server running on port 3001');
});