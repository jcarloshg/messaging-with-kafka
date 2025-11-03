import { useEffect } from 'react';
import { AppRouter } from './app-routes';
import { SocketService } from './app/share/infra/sockets/socket.service';

function App() {
  useEffect(() => {
    // Cleanup socket connection when app unmounts
    return () => {
      const socketService = SocketService.getInstance();
      socketService.disconnect();
    };
  }, []);

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App;
