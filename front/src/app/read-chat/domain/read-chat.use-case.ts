import type { Message } from "./message.type";
import type { MessageCrudRepository } from "../../share/domain/message/messgae.repo";

export class ReadChatUseCase {

    private readonly messageCrudRepository: MessageCrudRepository

    constructor(
        messageCrudRepository: MessageCrudRepository
    ) {
        this.messageCrudRepository = messageCrudRepository;
    }

    async execute(): Promise<ReadChatUserCaseResponse> {
        try {

            // 1. get from db
            const messagesResp = await this.messageCrudRepository.findAll();
            if (messagesResp.length === 0) {
                return {
                    success: false,
                    error: "No messages found"
                };
            }

            // 2. map to domain
            const messages: Message[] = messagesResp.map((msg) => ({
                messageId: msg.messageId,
                senderId: msg.senderId,
                content: msg.content,
                timestamp: msg.timestamp.toISOString()
            }));

            return {
                success: true,
                messages
            };


        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return {
                success: false,
                error: `[ReadChatUseCase] - [execute]: ${errorMessage}`
            };
        }
    }


}

export interface ReadChatUserCaseRequest { }

export interface ReadChatUserCaseResponse {
    success: boolean;
    error?: string;
    messages?: Message[];
}