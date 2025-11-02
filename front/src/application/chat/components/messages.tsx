import { useEffect, useState } from "react";
import { getMassageOfChat } from "@/bussines_rules/read-chat/infra/get-massage-of-chat";
import type { Message } from "@/bussines_rules/read-chat/domain/message.type";
import { ListMessages } from "./list-messages";
import { NoMessagesYet } from "./NoMessagesYet";
import { ReadChatApplication } from "@/bussines_rules/read-chat/application/read-chat.application";

export interface MessageProps {
    username?: string;
}

export const Messages = (props: MessageProps) => {

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        (async () => {
            const readChatApplication = new ReadChatApplication();
            const messages = await readChatApplication.execute();
            console.log(`messages: `, messages);
            // const messages = await getMassageOfChat();
            // setMessages(messages);
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


