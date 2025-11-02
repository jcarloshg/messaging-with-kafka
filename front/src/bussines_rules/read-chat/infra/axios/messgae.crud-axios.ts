import type { CrudRepository } from "@/bussines_rules/share/domain/crud.repository";
import axios, { type AxiosInstance } from "axios";
import type { MessageFromDB } from "../../domain/messgae.repo";

export class MessageCrudAxios implements CrudRepository<MessageFromDB> {

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

    create(item: MessageFromDB): Promise<MessageFromDB | null> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<MessageFromDB[]> {
        try {
            const response = await this.axiosInstance.get("");
            return response.data.data.data as MessageFromDB[];
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

