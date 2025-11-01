import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { UserNameForm, type FormState } from "./user-name-form";
import { Button } from "@/components/ui/button";

export interface UserNameModalProps {
    open: boolean;
    onClose: () => void;
    setUsername: (username: string) => void;
}

export const UserNameModal = (props: UserNameModalProps) => {

    const { open, onClose, setUsername } = props;
    const [formState, setFormState] = useState<FormState>({
        userForm: {
            username: "",
        },
        isValid: false,
    });

    const initChat = () => {
        if (!formState.isValid) {
            alert("Please enter a valid username.");
            return;
        }
        setUsername(formState.userForm.username);
        onClose();
    }


    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                if (!formState.isValid) return;
            }}
        >
            <DialogContent className="flex flex-col gap-6">

                <DialogHeader>
                    <DialogTitle>Enter Your Username</DialogTitle>
                    <DialogDescription>
                        Please provide a username to continue.
                    </DialogDescription>
                </DialogHeader>

                <UserNameForm
                    userForm={formState.userForm}
                    onChange={setFormState}
                />

                <Button onClick={initChat}>
                    Init chat
                </Button>

            </DialogContent>
        </Dialog>
    )
}
