import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageExchangeApplication } from "@/app/message-exchange/application/message-exchange.application";
import type { MessageProps } from "@/app/message-exchange/domain/message.type";
import { InputChatForm, type InputChatFormState, type InputChatFormRef } from "./input-chat-form";


export interface InputProps {
    username: string;
}

export const InputChat = (props: InputProps) => {

    const inputChatFormRef = useRef<InputChatFormRef>(null);

    const [inputChatFormState, setInputChatFormState] = useState<InputChatFormState>({
        inputChatForm: {
            message: "",
        },
        isValid: false,
    });

    const sendMessage = async () => {
        try {
            const messageExchangeApp = new MessageExchangeApplication();
            const messageProps: MessageProps = {
                content: inputChatFormState.inputChatForm.message,
                timestamp: new Date(),
                messageId: crypto.randomUUID(),
                senderId: props.username,
            }

            const messageExchangeRes = await messageExchangeApp.execute({ message: messageProps });

            // error handling
            if (!messageExchangeRes.success && messageExchangeRes.error) {
                alert(`Error: ${messageExchangeRes.error}`);
                return;
            }

            // success handling - reset the form using ref
            inputChatFormRef.current?.resetForm();

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`[InputChat] - [sendMessage]: ${errorMessage}`);
            alert(`Error: ${errorMessage}`);
        }
    }

    return (
        <div className="flex flex-row w-full max-w-2xl mx-auto gap-2 p-2 sm:p-4 ">

            <InputChatForm
                ref={inputChatFormRef}
                inputChatForm={inputChatFormState.inputChatForm}
                onChange={setInputChatFormState}
                onPressEnter={sendMessage}
            />

            <Button onClick={sendMessage}>
                Send
            </Button>

        </div>
    )
}