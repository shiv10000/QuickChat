import { useState, useEffect, useRef } from 'react';

const ChatScreen = ({ roomCode, users, messages, sendMessage, leaveRoom }) => {
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (messageInput.trim() && users.length > 1) {
      sendMessage(messageInput);
      setMessageInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-screen">
      <header>
        <h1>Instant Convo</h1>
        <div className="room-info">
          <span>Room: {roomCode}</span>
          <span>Users: {users.length}</span>
        </div>
      </header>
      
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="input-area">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={users.length === 1 
            ? "Waiting for others to join..." 
            : "Type Message"}
          disabled={users.length === 1}
        />
        <button 
          onClick={handleSend} 
          disabled={users.length === 1 || !messageInput.trim()}
        >
          Send
        </button>
      </div>
      
      <button className="exit-btn" onClick={leaveRoom}>
        Exit Room
      </button>
    </div>
  );
};

export default ChatScreen;