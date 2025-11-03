# Socket.IO Integration Documentation

## Overview

This document describes the Socket.IO integration implemented to enable real-time messaging in the chat application. The integration allows the frontend to receive live chat messages from the backend via WebSocket connections.

## Architecture

### Backend (Socket.IO Server)
- **Location**: `back/src/presentation/sockets/`
- **Main Files**:
  - `socket.ts` - Main Socket.IO server setup
  - `chat-message.controller.ts` - Handles chat message events

### Frontend (Socket.IO Client)
- **Location**: `front/src/app/share/infra/`
- **Main Files**:
  - `socket.service.ts` - Socket.IO client service (Singleton)
  - `socket.config.ts` - Configuration for Socket.IO connection
  - `useSocket.hook.ts` - React hook for Socket.IO operations

## Implementation Details

### 1. Socket Service (`socket.service.ts`)

The `SocketService` is implemented as a singleton to ensure a single WebSocket connection across the application.

**Key Features:**
- Singleton pattern for connection management
- Automatic reconnection handling
- Event listener management
- Connection status tracking

**Events Handled:**
- `chat-message` - Receives new chat messages from the backend

### 2. Custom Hook (`useSocket.hook.ts`)

The `useSocket` hook provides a React-friendly interface to the Socket.IO service.

**Key Features:**
- Automatic connection establishment
- Cleanup on component unmount
- Connection status checking

### 3. Configuration (`socket.config.ts`)

Centralized configuration for Socket.IO connection settings.

**Environment Variables:**
- `VITE_SOCKET_URL` - Backend Socket.IO server URL (default: http://localhost:3000)

## Usage Examples

### Receiving Messages in Components

```tsx
import { useSocket } from "@/app/share/infra/useSocket.hook";
import type { ChatMessagePayload } from "@/app/share/infra/socket.service";

const MyComponent = () => {
    const { onChatMessage, offChatMessage } = useSocket();

    useEffect(() => {
        const handleNewMessage = (payload: ChatMessagePayload) => {
            console.log('New message:', payload);
            // Handle the new message
        };

        onChatMessage(handleNewMessage);

        return () => {
            offChatMessage();
        };
    }, [onChatMessage, offChatMessage]);

    // Component JSX...
};
```

### Connection Status Monitoring

```tsx
import { useSocket } from "@/app/share/infra/useSocket.hook";

const StatusComponent = () => {
    const { isConnected } = useSocket();
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const checkConnection = () => {
            setConnected(isConnected());
        };

        const interval = setInterval(checkConnection, 1000);
        checkConnection();

        return () => clearInterval(interval);
    }, [isConnected]);

    return <div>{connected ? 'Connected' : 'Disconnected'}</div>;
};
```

## Components Updated

### 1. Messages Component (`messages.tsx`)

**Changes:**
- Added Socket.IO integration using `useSocket` hook
- Listens for `chat-message` events
- Automatically adds new messages to the existing message list
- Maintains existing functionality for loading initial messages

### 2. App Component (`App.tsx`)

**Changes:**
- Added Socket.IO cleanup on app unmount
- Ensures proper connection lifecycle management

### 3. Header Component (`header.tsx`)

**Changes:**
- Added `ConnectionStatus` component to display real-time connection status
- Visual indicator for users to see WebSocket connection state

## Message Flow

1. **Backend**: When a new message is sent, the backend emits a `chat-message` event via Socket.IO
2. **Frontend**: The `SocketService` receives the event and parses the JSON payload
3. **Hook**: The `useSocket` hook calls the registered callback function
4. **Component**: The `Messages` component receives the new message and updates the UI

## Data Types

### ChatMessagePayload
```typescript
interface ChatMessagePayload {
    messageId: string;
    senderId: string;
    content: string;
    timestamp: Date;
}
```

### ChatMessageEventBody
```typescript
interface ChatMessageEventBody {
    payload: ChatMessagePayload;
}
```

## Configuration Options

### Socket.IO Client Options
- `transports`: ['websocket', 'polling']
- `autoConnect`: true
- `reconnection`: true
- `reconnectionAttempts`: 5
- `reconnectionDelay`: 1000ms
- `timeout`: 20000ms

## Environment Setup

### Development
1. Ensure the backend Socket.IO server is running on port 3000
2. The frontend will automatically connect to `http://localhost:3000`

### Production
1. Set the `VITE_SOCKET_URL` environment variable to your production Socket.IO server URL
2. Build and deploy the frontend application

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check if the backend Socket.IO server is running
   - Verify the server URL in configuration
   - Check browser console for connection errors

2. **Messages Not Received**
   - Verify the `chat-message` event is being emitted from the backend
   - Check if the event payload format matches the expected structure
   - Ensure the component is properly using the `useSocket` hook

3. **Multiple Connections**
   - The singleton pattern should prevent this, but check for multiple `SocketService.getInstance()` calls
   - Ensure proper cleanup in useEffect hooks

### Debug Mode

To enable debug mode for Socket.IO, add this to your browser console:
```javascript
localStorage.debug = 'socket.io-client:socket';
```

## Future Enhancements

1. **Error Handling**: Implement comprehensive error handling for connection failures
2. **Retry Logic**: Add exponential backoff for reconnection attempts
3. **Message Acknowledgments**: Implement message delivery confirmations
4. **Room Support**: Add support for chat rooms/channels
5. **Typing Indicators**: Real-time typing status updates
6. **Presence System**: Online/offline user status tracking