import type { CrudRepository } from "@/app/share/domain/repo/crud.repository";


export interface MessageToBack {
    messageId: string;
    senderId: string;
    content: string;
    timestamp: Date;
}

export class MessageCrudRepository implements CrudRepository<MessageToBack> {

    constructor() { }

    create(item: MessageToBack): Promise<MessageToBack | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<MessageToBack[]> {
        throw new Error("Method not implemented.");
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