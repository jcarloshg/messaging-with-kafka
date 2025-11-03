import { useEffect, useState } from "react";

import { UserNameModal } from "./components/user-name.modal";
import { Header } from "./components/header";
import { Messages } from "./components/messages";
import { InputChat } from "./components/input";

const ChatPage = () => {

    const [username, setUsername] = useState<string | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!username) setShowModal(true);
    }, [username]);

    return (

        <div className="h-screen w-screen flex flex-col">

            {showModal && (
                <UserNameModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    setUsername={setUsername}
                />
            )}

            <Header username={username} />

            <Messages username={username} />

            {
                username && <InputChat username={username} />
            }
        </div>
    )
}

export default ChatPage;