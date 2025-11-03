import { MessageCrudPostgress } from "@/app/shared/infrastructure/postgres/message.crud-postgress";
import { ReadChatUseCase } from "../domain/read-chat.use-case";

export class ReadChatApplication {

    constructor() { }

    async execute(request: ReadChatApplicationRequest): Promise<ReadChatApplicationResponse> {
        try {

            // init repository
            const messageRepository = new MessageCrudPostgress();

            // ─────────────────────────────────────
            // execute use case
            // ─────────────────────────────────────
            const useCase = new ReadChatUseCase(messageRepository);
            const result = await useCase.execute();
            return {
                success: result.success,
                error: result.error,
                data: result.data,
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return {
                success: false,
                error: errorMessage,
                // error: "Something went wrong. Try again later.",
            }
        }
    }

}

export interface ReadChatApplicationRequest {
    // body: { [key: string]: any };
    // queeryParams: { [key: string]: any };
}

export interface ReadChatApplicationResponse {
    success: boolean;
    error?: string;
    data?: any;
}