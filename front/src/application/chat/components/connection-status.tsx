import { useEffect, useState } from 'react';
import { useSocket } from '@/app/share/infra/sockets/useSocket.hook';

export const ConnectionStatus = () => {
    const { isConnected } = useSocket();
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const checkConnection = () => {
            setConnected(isConnected());
        };

        // Check connection status periodically
        const interval = setInterval(checkConnection, 1000);
        checkConnection(); // Initial check

        return () => clearInterval(interval);
    }, [isConnected]);

    return (
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            connected 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
        }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
                connected ? 'bg-green-400' : 'bg-red-400'
            }`} />
            {connected ? 'Connected' : 'Disconnected'}
        </div>
    );
};