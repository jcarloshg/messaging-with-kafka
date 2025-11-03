export const socketConfig = {
    serverUrl: import.meta.env.VITE_SOCKET_URL || 'http://localhost:8000',
    options: {
        transports: ['websocket', 'polling'],
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000
    }
};