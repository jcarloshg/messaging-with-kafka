import { useEffect, useState } from "react";
import type { Message } from "@/app/read-chat/domain/message.type";
import { ReadChatApplication } from "@/app/read-chat/application/read-chat.application";

import { ListMessages } from "./list-messages";
import { NoMessagesYet } from "./NoMessagesYet";


export interface MessageProps {
    username?: string;
}

export const Messages = (props: MessageProps) => {

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        (async () => {
            const readChatApplication = new ReadChatApplication();
            const messagesResp = await readChatApplication.execute();
            if (messagesResp.success && messagesResp.messages) {
                setMessages(messagesResp.messages);
                return;
            }

            if (messagesResp.error) {
                alert(messagesResp.error);
                return;
            }

        })();
    }, []);

    return (
        <div className="flex flex-col h-full w-full max-w-2xl mx-auto gap-4 p-2 sm:p-4 overflow-y-auto ">
            {
                messages.length === 0
                    ?
                    <NoMessagesYet />
                    :
                    <ListMessages
                        messages={messages}
                        username={props.username}
                    />
            }
        </div>
    );
};


