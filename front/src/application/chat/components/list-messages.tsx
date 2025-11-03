import type { Message } from "@/app/read-chat/domain/message.type";

export interface ListMessagesProps {
    username?: string;
    messages: Message[];
}

export const ListMessages = (props: ListMessagesProps) => {

    const { messages } = props;

    return (
        <>
            {
                messages.map(
                    (msg, idx) => (
                        <div
                            key={idx}
                            ref={idx === messages.length - 1 ? (el) => { if (el) el.scrollIntoView({ behavior: "smooth" }); } : undefined}
                            className={`flex flex-col max-w-lg ${msg.senderId === props.username
                                ? "self-end items-end"
                                : "self-start items-start"
                                }`}
                        >
                            <span className="text-xs text-gray-500 mb-1">
                                {msg.senderId}
                            </span>
                            <div
                                className={`px-4 py-2 rounded-lg text-base ${msg.senderId === props.username
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-800 border"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    )
                )
            }
        </>
    )
}