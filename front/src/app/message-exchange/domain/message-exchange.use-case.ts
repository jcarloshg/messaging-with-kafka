import type { MessageCrudRepository, MessageToBack } from "@/app/share/domain/message/messgae.repo";
import { MessageToSend, type MessageProps } from "./message.type";


export class MessageExchangeUseCase {

    private readonly _messageCrudRepository: MessageCrudRepository

    constructor(
        messageCrudRepository: MessageCrudRepository
    ) {
        this._messageCrudRepository = messageCrudRepository;
    }

    async execute(message: MessageProps): Promise<MessageExchangeUseCaseResponse> {
        try {

            // 1. valid business rules
            const messageToSend = new MessageToSend(message);

            // 2. send message
            const messageToBack: MessageToBack = {
                messageId: messageToSend.primitives.messageId,
                senderId: messageToSend.primitives.senderId,
                content: messageToSend.primitives.content,
                timestamp: messageToSend.primitives.timestamp,
            };
            const createResponse = await this._messageCrudRepository.create(messageToBack);

            // 2. save to db
            if (!createResponse) {
                return {
                    success: false,
                    error: "Failed to create message"
                };
            }

            return {
                success: true,
                data: {
                    content: createResponse.content,
                    messageId: createResponse.messageId,
                    senderId: createResponse.senderId,
                    timestamp: createResponse.timestamp
                }
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return {
                success: false,
                error: `[MessageExchangeUseCase] - [execute]: ${errorMessage}`
            };
        }
    }
}

export interface MessageExchangeUseCaseRequest { }

export interface MessageExchangeUseCaseResponse {
    success: boolean;
    error?: string;
    data?: MessageProps
}