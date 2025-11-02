import type { CrudRepository } from "@/bussines_rules/share/domain/crud.repository";


export interface MessageFromDB {
    id: string;
    senderId: string;
    content: string;
    timestamp: Date;
}

export class MessageCrudRepository implements CrudRepository<MessageFromDB> {

    constructor() { }

    create(item: MessageFromDB): Promise<MessageFromDB | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<MessageFromDB[]> {
        throw new Error("Method not implemented.");
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