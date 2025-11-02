import type { CrudRepository } from "@/bussines_rules/share/domain/crud.repository";
import type { Message } from "../../domain/message.type";
import axios, { type AxiosInstance } from "axios";

export class MessageCrudAxios implements CrudRepository<Message> {

    private readonly axiosInstance: AxiosInstance;

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

    create(item: Message): Promise<Message | null> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Message[]> {
        try {
            const response = await this.axiosInstance.get("");
            return response.data.data.data as Message[];
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`[MessgaeCrudAxios] - [findAll]: ${errorMessage}`);
            return Promise.resolve([]);
        }
    }

    findById(id: string): Promise<Message | null> {
        throw new Error("Method not implemented.");
    }
    findByFields(fields: Partial<Message>): Promise<Message | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: Partial<Message>): Promise<Message | null> {
        throw new Error("Method not implemented.");
    }
    softDelete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    destroy(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

