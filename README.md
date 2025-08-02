# QuickChatApp - Instant Real-Time Chat Application

A modern, lightweight real-time chat application built with React and WebSocket technology. QuickChatApp allows users to create or join chat rooms instantly and communicate in real-time with other participants.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using WebSocket connections
- **Room-based Chat**: Create or join chat rooms with unique room codes
- **User Management**: See who's online in your chat room
- **Simple & Clean UI**: Modern, responsive design with intuitive user interface
- **No Registration Required**: Start chatting immediately without any sign-up process
- **Cross-platform**: Works on desktop and mobile browsers

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with modern design
- **WebSocket API** - Real-time communication

### Backend
- **Node.js** - JavaScript runtime
- **ws** - WebSocket library for real-time communication
- **HTTP Server** - Built-in Node.js HTTP server

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/QuickChatApp.git
cd QuickChatApp
```

### 2. Install Backend Dependencies
```bash
cd chat-app-backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../chat-app-frontend
npm install
```

## 🏃‍♂️ Running the Application

### 1. Start the Backend Server
```bash
cd chat-app-backend
node server.js
```
The WebSocket server will start running on port 3001.

### 2. Start the Frontend Development Server
```bash
cd chat-app-frontend
npm run dev
```
The React application will start on `http://localhost:5173` (or another available port).

### 3. Open the Application
Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## 📖 How to Use

### Creating a Room
1. Click the **"Create New Room"** button
2. Enter your username
3. Share the generated room code with others
4. Click **"Join Room"** to enter the chat

### Joining a Room
1. Enter your username
2. Enter the room code provided by someone else
3. Click **"Join Room"** to enter the chat

### Chatting
- Type your message in the input field
- Press **Enter** or click **"Send"** to send your message
- Messages are delivered instantly to all users in the room
- See who's currently in the room at the top of the chat

### Leaving a Room
- Click the **"Exit Room"** button to leave the current chat room

## 📁 Project Structure

```
QuickChatApp/
├── chat-app-backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js          # WebSocket server
├── chat-app-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatScreen.jsx    # Main chat interface
│   │   │   └── JoinScreen.jsx    # Room joining interface
│   │   ├── App.jsx               # Main application component
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔧 Development

### Available Scripts

**Frontend (in `chat-app-frontend/`):**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend (in `chat-app-backend/`):**
- `node server.js` - Start the WebSocket server

### WebSocket Message Types

The application uses the following WebSocket message types:

- `join` - Join a chat room
- `message` - Send a chat message
- `leave` - Leave the current room
- `userList` - Update user list (server response)
- `message` - Receive a chat message (server response)

## 🌟 Key Features Explained

### Real-time Communication
The app uses WebSocket connections to enable instant message delivery without polling or refreshing.

### Room Management
Each chat room has a unique 6-character code that users can share to join the same conversation.

### User Tracking
The server maintains a list of active users in each room and broadcasts updates when users join or leave.

### Responsive Design
The UI adapts to different screen sizes and provides a consistent experience across devices.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with React and Node.js
- WebSocket implementation using the `ws` library
- Styled with modern CSS for a clean user experience

---

**Happy Chatting! 💬** 