import { MessageCrudAxios } from "@/app/share/infra/axios/messgae.crud-axios";
import type { Message } from "../domain/message.type";
import { ReadChatUseCase } from "../domain/read-chat.use-case";


export class ReadChatApplication {

    constructor() { }

    async execute(): Promise<ReadChatApplicationResp> {
        try {

            // init repos
            const messageCrudAxios = MessageCrudAxios.getInstance();

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