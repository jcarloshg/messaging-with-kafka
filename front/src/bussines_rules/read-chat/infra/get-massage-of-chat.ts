import type { Message } from "../domain/message.type";


export const getMassageOfChat = async (): Promise<Message[]> => {
    return []
    return [
        {
            messageId: "1",
            senderId: "user1",
            content: "Hello!",
            timestamp: "2023-03-15T12:00:00Z"
        },
        {
            messageId: "2",
            senderId: "user2",
            content: "Hi there!",
            timestamp: "2023-03-15T12:01:00Z"
        },
        {
            messageId: "3",
            senderId: "jose",
            content: "How are you?",
            timestamp: "2023-03-15T12:02:00Z"
        }
    ]
}