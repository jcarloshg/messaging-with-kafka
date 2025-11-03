import { useState } from "react";
import { InputChatForm, type InputChatFormState } from "./input-chat-form";
import { Button } from "@/components/ui/button";

export interface InputProps {

}

export const InputChat = (props: InputProps) => {

    const [inputChatFormState, setInputChatFormState] = useState<InputChatFormState>({
        userForm: {
            message: "",
        },
        isValid: false,
    });

    const sendMessage = async () => {
        console.log(`inputChatFormState: `, inputChatFormState);
    }



    return (
        <div className="flex flex-row w-full border-2 border-amber-950">

            <InputChatForm
                inputChatForm={inputChatFormState.userForm}
                onChange={setInputChatFormState}
                onPressEnter={sendMessage}
            />

            <Button onClick={sendMessage}>
                Init chat
            </Button>

        </div>
    )
}