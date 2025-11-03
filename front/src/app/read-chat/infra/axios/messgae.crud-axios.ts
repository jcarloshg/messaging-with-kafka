import type { CrudRepository } from "@/bussines_rules/share/domain/crud.repository";
import axios, { type AxiosInstance } from "axios";
import type { MessageFromDB } from "../../domain/messgae.repo";

export class MessageCrudAxios implements CrudRepository<MessageFromDB> {

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

    create(item: MessageFromDB): Promise<MessageFromDB | null> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<MessageFromDB[]> {
        try {
            const responseRaw = await this.axiosInstance.get<MessageApiResponse>("");
            const messagesRaw = responseRaw.data.data;
            const messagesFromDB: MessageFromDB[] = messagesRaw.map((msg) => ({
                id: msg.id,
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

    findById(id: string): Promise<MessageFromDB | null> {
        throw new Error("Method not implemented.");
    }
    findByFields(fields: Partial<MessageFromDB>): Promise<MessageFromDB | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: Partial<MessageFromDB>): Promise<MessageFromDB | null> {
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
    data: MessageFromDB[];
}