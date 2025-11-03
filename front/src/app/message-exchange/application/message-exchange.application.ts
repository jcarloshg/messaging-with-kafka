import { MessageExchangeUseCase } from "../domain/message-exchange.use-case";
import type { MessageProps } from "../domain/message.type";
import { MessageCrudAxios } from "@/app/share/infra/axios/messgae.crud-axios";

export class MessageExchangeApplication {

    constructor() { }

    async execute(req: MessageExchangeApplicationRequest): Promise<MessageExchangeApplicationResp> {
        try {
            // init repository
            const messageCrudAxios = MessageCrudAxios.getInstance();

            // ─────────────────────────────────────
            // execute use case
            // ─────────────────────────────────────
            const useCase = new MessageExchangeUseCase(messageCrudAxios);
            const result = await useCase.execute(req.message);
            return {
                success: result.success,
                error: result.error,
                data: result.data
            };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return {
                success: false,
                error: `[MessageExchangeApplication] - [execute]: ${errorMessage}`,
            };
        }

    }
}

export interface MessageExchangeApplicationRequest {
    message: MessageProps
}

export interface MessageExchangeApplicationResp {
    success: boolean;
    error?: string;
    data?: MessageProps;
}