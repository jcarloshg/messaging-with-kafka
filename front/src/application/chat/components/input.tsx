import { useState } from "react";
import { InputChatForm, type InputChatFormState } from "./input-chat-form";
import { Button } from "@/components/ui/button";
import { MessageExchangeApplication } from "@/app/message-exchange/application/message-exchange.application";
import type { MessageProps } from "@/app/message-exchange/domain/message.type";


export interface InputProps {
    username: string;
}

export const InputChat = (props: InputProps) => {

    const [inputChatFormState, setInputChatFormState] = useState<InputChatFormState>({
        userForm: {
            message: "",
        },
        isValid: false,
    });

    const sendMessage = async () => {
        try {
            const messageExchangeApp = new MessageExchangeApplication();
            const messageProps: MessageProps = {
                content: inputChatFormState.userForm.message,
                timestamp: new Date(),
                messageId: crypto.randomUUID(),
                senderId: props.username,
            }
            await messageExchangeApp.execute({ message: messageProps });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`[InputChat] - [sendMessage]: ${errorMessage}`);
            alert(`Error: ${errorMessage}`);
        }
    }

    return (
        <div className="flex flex-row w-full max-w-2xl mx-auto gap-2 p-2 sm:p-4 ">

            <InputChatForm
                inputChatForm={inputChatFormState.userForm}
                onChange={setInputChatFormState}
                onPressEnter={sendMessage}
            />

            <Button onClick={sendMessage}>
                Send
            </Button>

        </div>
    )
}