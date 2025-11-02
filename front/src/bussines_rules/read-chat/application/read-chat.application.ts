import type { Message } from "../domain/message.type";
import { MessageCrudAxios } from "../infra/axios/messgae.crud-axios";

export class ReadChatApplication {

    constructor() { }

    async execute(): Promise<Message[]> {
        try {
            // init repos
            const messageCrudAxios = new MessageCrudAxios();
            const messages = await messageCrudAxios.findAll();
            return messages;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`[ReadChatApplication] - [execute]: ${errorMessage}`);
            return [];
        }
    }
}