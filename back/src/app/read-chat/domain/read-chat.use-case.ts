import { MessageCrudRepository } from "@/app/shared/domain/repository/messgae.crud-repository";
import { MessageProps } from "./message.entity";

export class ReadChatUseCase {

    private readonly messageRepository: MessageCrudRepository;

    constructor(messageRepository: MessageCrudRepository) {
        this.messageRepository = messageRepository;
    }

    async execute(): Promise<ReadChatUseCaseResponse> {

        try {
            const messagesRaw = await this.messageRepository.findAll();
            const message: MessageProps[] = messagesRaw.map(
                msg => ({
                    messageId: msg.id,
                    senderId: msg.senderId,
                    content: msg.content,
                    timestamp: msg.timestamp instanceof Date
                        ? msg.timestamp.toISOString()
                        : msg.timestamp,
                })
            );

            return {
                success: true,
                data: message,
            };

        } catch (error) {
            return {
                success: false,
                error: "Something went wrong reading the chat messages",
            }
        }

    }
}



export interface ReadChatUseCaseRequest {
    // chatId?: string;
}

export interface ReadChatUseCaseResponse {
    success: boolean;
    error?: string;
    data?: MessageProps[];
}