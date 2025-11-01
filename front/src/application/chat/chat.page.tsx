import { useEffect, useState } from "react";
import { UserNameModal } from "../welcome/components/user-name.modal";

const ChatPage = () => {

    const [username, setUsername] = useState<string | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!username) setShowModal(true);
    }, [username]);

    return (
        <div>

            {showModal && (
                <UserNameModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    setUsername={setUsername}
                />
            )}

        </div>
    )
}

export default ChatPage;