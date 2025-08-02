import { useState } from 'react';

const JoinScreen = ({ joinRoom, generateRoomCode, setRoomCode, setUsername }) => {
  const [localUsername, setLocalUsername] = useState('');
  const [localRoomCode, setLocalRoomCode] = useState('');

  const handleCreateRoom = () => {
    const newCode = generateRoomCode();
    setRoomCode(newCode);
    setLocalRoomCode(newCode);
  };

  const handleJoin = () => {
    if (localUsername.trim() && localRoomCode.trim()) {
      setUsername(localUsername);
      joinRoom(localUsername, localRoomCode);
    }
  };

  return (
    <div className="join-screen">
      <h1>Join Instant Convo</h1>
      
      <button className="create-btn" onClick={handleCreateRoom}>
        Create New Room
      </button>
      
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={localUsername}
          onChange={(e) => setLocalUsername(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label>Room Code</label>
        <input
          type="text"
          placeholder="Enter room code"
          value={localRoomCode}
          onChange={(e) => setLocalRoomCode(e.target.value)}
        />
      </div>
      
      <button className="join-btn" onClick={handleJoin}>
        Join Room
      </button>
    </div>
  );
};

export default JoinScreen;