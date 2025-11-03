import { useEffect, useRef } from 'react';
import { SocketService, type ChatMessagePayload } from '@/app/share/infra/sockets/socket.service';

export const useSocket = () => {
    const socketService = useRef<SocketService>(SocketService.getInstance());

    useEffect(() => {
        const socket = socketService.current;
        socket.connect();

        return () => {
            // Cleanup listeners but keep connection for other components
            socket.offChatMessage();
        };
    }, []);

    const onChatMessage = (callback: (message: ChatMessagePayload) => void) => {
        socketService.current.onChatMessage(callback);
    };

    const offChatMessage = () => {
        socketService.current.offChatMessage();
    };

    const isConnected = () => {
        return socketService.current.isConnected();
    };

    return {
        onChatMessage,
        offChatMessage,
        isConnected
    };
};