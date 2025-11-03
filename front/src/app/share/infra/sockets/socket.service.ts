import { io, Socket } from 'socket.io-client';
import { socketConfig } from './socket.config';

export interface ChatMessagePayload {
    messageId: string;
    senderId: string;
    content: string;
    timestamp: Date;
}

export interface ChatMessageEventBody {
    payload: ChatMessagePayload;
}

export class SocketService {
    private static instance: SocketService;
    private socket: Socket | null = null;

    private constructor() {}

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public connect(): void {
        if (!this.socket) {
            this.socket = io(socketConfig.serverUrl, socketConfig.options);

            this.socket.on('connect', () => {
                console.log('Connected to server:', this.socket?.id);
            });

            this.socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });

            this.socket.on('connect_error', (error) => {
                console.error('Connection error:', error);
            });
        }
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    public onChatMessage(callback: (message: ChatMessagePayload) => void): void {
        if (this.socket) {
            this.socket.on('chat-message', (data: string) => {
                try {
                    const eventBody: ChatMessageEventBody = JSON.parse(data);
                    callback(eventBody.payload);
                } catch (error) {
                    console.error('Error parsing chat message:', error);
                }
            });
        }
    }

    public offChatMessage(): void {
        if (this.socket) {
            this.socket.off('chat-message');
        }
    }

    public isConnected(): boolean {
        return this.socket?.connected ?? false;
    }
}