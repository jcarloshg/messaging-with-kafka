import { useEffect, useState } from "react";
import { getMassageOfChat } from "@/bussines_rules/read-chat/infra/get-massage-of-chat";
import type { Message } from "@/bussines_rules/read-chat/domain/message.type";

export interface MessageProps {
    username?: string;
}

export const Messages = (props: MessageProps) => {

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        (async () => {
            const messages = await getMassageOfChat();
            setMessages(messages);
        })();
    }, []);

    return (
        <div className="flex flex-col h-full w-full max-w-2xl mx-auto gap-4 p-2 sm:p-4 bg-gray-50 rounded-lg shadow-md overflow-y-auto ">


            {
                messages.length === 0
                    ?
                    <NoMessagesYet />
                    :
                    <div>
                        messages :D
                    </div>
            }

            {/* <div className="flex-1 space-y-3">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">No messages yet.</div>
                ) : (
                    messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col max-w-lg ${msg.senderId === props.username
                                ? "self-end items-end"
                                : "self-start items-start"
                                }`}
                        >
                            <span className="text-xs text-gray-500 mb-1">
                                {msg.senderId}
                            </span>
                            <div
                                className={`px-4 py-2 rounded-lg text-sm ${msg.senderId === props.username
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-800 border"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))
                )}
            </div> */}
        </div>
    );
};


export const NoMessagesYet = () => {
    return (
        <div className="flex flex-col h-full items-center justify-center py-12">
            <svg
                className="w-12 h-12 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
                />
            </svg>
            <div className="text-lg text-gray-400 font-medium">No messages yet.</div>
            <div className="text-sm text-gray-300 mt-2">Start the conversation!</div>
        </div>
    );
}