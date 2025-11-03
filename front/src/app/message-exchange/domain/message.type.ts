import { z } from "zod";

export const MessageSchema = z.object({
    messageId: z.uuid(),
    senderId: z.string().min(1).max(50),
    content: z.string().min(1).max(250),
    timestamp: z.date().min(new Date()),
});

export type MessageProps = z.infer<typeof MessageSchema>;

export class MessageToSend {

    private readonly props: MessageProps;

    constructor(props: MessageProps) {
        const parsed = MessageSchema.safeParse(props);
        if (!parsed.success) {
            throw new Error(`Invalid Message properties: ${parsed.error.message}`);
        }
        this.props = parsed.data;
    }

    public get primitives(): MessageProps {
        return { ...this.props };
    }
}