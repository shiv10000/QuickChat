import { useState, useEffect, useRef } from 'react';
import JoinScreen from './components/JoinScreen';
import ChatScreen from './components/ChatScreen';

function App() {
  const [screen, setScreen] = useState('join');
  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  const generateRoomCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const joinRoom = (name, code) => {
    const ws = new WebSocket('ws://localhost:3001');
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'join',
        roomCode: code,
        username: name
      }));
      setScreen('chat');
      setRoomCode(code);
      setUsername(name);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'userList':
          setUsers(data.users);
          break;
        case 'message':
          setMessages(prev => [...prev, {
            username: data.username,
            text: data.text,
            timestamp: data.timestamp
          }]);
          break;
        default:
          break;
      }
    };

    ws.onclose = () => {
      setScreen('join');
      setUsers([]);
      setMessages([]);
    };
  };

  const sendMessage = (text) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        text
      }));
    }
  };

  const leaveRoom = () => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({ type: 'leave' }));
      wsRef.current.close();
    }
    setScreen('join');
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div className="app">
      {screen === 'join' ? (
        <JoinScreen 
          joinRoom={joinRoom} 
          generateRoomCode={generateRoomCode}
          setRoomCode={setRoomCode}
          setUsername={setUsername}
        />
      ) : (
        <ChatScreen 
          roomCode={roomCode}
          users={users}
          messages={messages}
          sendMessage={sendMessage}
          leaveRoom={leaveRoom}
        />
      )}
    </div>
  );
}

export default App;