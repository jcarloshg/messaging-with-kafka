import { ConnectionStatus } from './connection-status';

export interface HeaderProps {
    username?: string;
}

export const Header = (props: HeaderProps) => {
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white shadow">
            <div className="flex items-center space-x-4">
                <span className="font-bold text-lg">Messaging with Kafka</span>
                <ConnectionStatus />
            </div>
            {
                props.username
                &&
                (
                    <div className="flex items-center space-x-3">
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(props.username ?? "User")}&background=0D8ABC&color=fff`}
                            alt="User Avatar"
                            className="w-9 h-9 rounded-full border-2 border-white shadow"
                        />
                        <span className="font-semibold text-md">{props.username ?? "User"}</span>
                    </div>
                )
            }

        </header>
    );
}