import axios, { type AxiosInstance } from "axios";
import type { CrudRepository } from "@/app/share/domain/repo/crud.repository";
import type { MessageToBack } from "@/app/share/domain/message/messgae.repo";

export class MessageCrudAxios implements CrudRepository<MessageToBack> {

    private readonly axiosInstance: AxiosInstance;
    private static _instance: MessageCrudAxios;

    constructor() {
        const urlBase = "http://localhost:8000/api/messages/";
        this.axiosInstance = axios.create({
            baseURL: urlBase,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    public static getInstance(): MessageCrudAxios {
        if (!MessageCrudAxios._instance) {
            MessageCrudAxios._instance = new MessageCrudAxios();
        }
        return MessageCrudAxios._instance;
    }

    async create(item: MessageToBack): Promise<MessageToBack | null> {
        try {
            interface CreateResponse {
                success: boolean;
                error?: string;
                data?: MessageToBack;
            }
            const responseRaw = await this.axiosInstance.post<CreateResponse>("", item);
            const createResponse: CreateResponse = responseRaw.data;

            if (!createResponse.success || !createResponse.data) {
                console.error(`[MessgaeCrudAxios] - [create]: ${createResponse.error}`);
                return null;
            }

            const messageToBack: MessageToBack = {
                messageId: createResponse.data.messageId,
                senderId: createResponse.data.senderId,
                content: createResponse.data.content,
                timestamp: createResponse.data.timestamp
            }
            return messageToBack;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`[MessgaeCrudAxios] - [create]: ${errorMessage}`);
            return null;
        }
    }

    async findAll(): Promise<MessageToBack[]> {
        try {
            const responseRaw = await this.axiosInstance.get<MessageApiResponse>("");
            const messagesRaw = responseRaw.data.data;
            const messagesFromDB: MessageToBack[] = messagesRaw.map((msg) => ({
                messageId: msg.messageId,
                senderId: msg.senderId,
                content: msg.content,
                timestamp: msg.timestamp instanceof Date
                    ? msg.timestamp
                    : new Date(msg.timestamp)
            }));
            return messagesFromDB;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`[MessgaeCrudAxios] - [findAll]: ${errorMessage}`);
            return Promise.resolve([]);
        }
    }

    findById(id: string): Promise<MessageToBack | null> {
        throw new Error("Method not implemented.");
    }
    findByFields(fields: Partial<MessageToBack>): Promise<MessageToBack | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: Partial<MessageToBack>): Promise<MessageToBack | null> {
        throw new Error("Method not implemented.");
    }
    softDelete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    destroy(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}


export interface MessageApiResponse {
    success: boolean;
    data: MessageToBack[];
}