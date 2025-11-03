import { useEffect, useState } from "react";
import type { Message } from "@/app/read-chat/domain/message.type";
import { ReadChatApplication } from "@/app/read-chat/application/read-chat.application";
import { useSocket } from "@/app/share/infra/sockets/useSocket.hook";
import type { ChatMessagePayload } from "@/app/share/infra/sockets/socket.service";

import { ListMessages } from "./list-messages";
import { NoMessagesYet } from "./NoMessagesYet";


export interface MessageProps {
    username?: string;
}

export const Messages = (props: MessageProps) => {

    const [messages, setMessages] = useState<Message[]>([]);
    const { onChatMessage, offChatMessage } = useSocket();

    useEffect(() => {
        // Load initial messages
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

        // Listen for new chat messages
        const handleNewMessage = (chatMessagePayload: ChatMessagePayload) => {
            const newMessage: Message = {
                messageId: chatMessagePayload.messageId,
                senderId: chatMessagePayload.senderId,
                content: chatMessagePayload.content,
                timestamp: chatMessagePayload.timestamp.toString()
            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        onChatMessage(handleNewMessage);

        // Cleanup function
        return () => {
            offChatMessage();
        };
    }, [onChatMessage, offChatMessage]);

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


