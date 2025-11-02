import type { Message } from "../domain/message.type";
import { ReadChatUseCase } from "../domain/read-chat.use-case";
import { MessageCrudAxios } from "../infra/axios/messgae.crud-axios";

export class ReadChatApplication {

    constructor() { }

    async execute(): Promise<ReadChatApplicationResp> {
        try {

            // init repos
            const messageCrudAxios = new MessageCrudAxios();

            // init use case
            const useCase = new ReadChatUseCase(messageCrudAxios);
            const resp = await useCase.execute();
            return {
                success: resp.success,
                error: resp.error,
                messages: resp.messages
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`[ReadChatApplication] - [execute]: ${errorMessage}`);
            return {
                success: false,
                error: `[ReadChatApplication] - [execute]: ${errorMessage}`
            }
        }
    }
}

export interface ReadChatApplicationResp {
    success: boolean;
    error?: string;
    messages?: Message[];
}