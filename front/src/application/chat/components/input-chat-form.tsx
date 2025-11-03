import { useEffect } from "react";

import { Input } from "@/components/ui/input"
import { Field, FieldDescription } from "@/components/ui/field"

import { useFormik } from "formik";
import * as Yup from "yup";


const FormValidationSchema = Yup.object({
    message: Yup.string()
        .min(2, "message must be at least 2 characters")
        .max(250, "message must be at most 250 characters")
        .required("message is required"),
});

export interface FormProps {
    message: string;
}

export interface InputChatFormState {
    inputChatForm: FormProps;
    isValid: boolean;
}

export interface InputChatFormProps {
    inputChatForm: FormProps;
    onChange: (formState: InputChatFormState) => void;
    onPressEnter?: () => Promise<void>;
}

export const InputChatForm = (props: InputChatFormProps) => {

    const { inputChatForm, onChange, onPressEnter } = props;

    const formik = useFormik<FormProps>({
        initialValues: inputChatForm,
        validationSchema: FormValidationSchema,
        validateOnMount: true,
        onSubmit: async (values: FormProps) => {
            // You can handle form submission here if needed
            // For now, just log the values to avoid unused variable error
            console.log(values);
        },
    });

    useEffect(() => {
        onChange({
            inputChatForm: {
                message: formik.values.message,
            },
            isValid: formik.isValid,
        });
    }, [formik.values]);


    return (

        <form
            className="justify-center items-center w-full"
            onKeyDown={async (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    await onPressEnter?.();
                }
            }}
        >
            <Field className="w-full ">
                {/* <FieldLabel htmlFor="username">Username:</FieldLabel> */}
                <Input
                    id="message"
                    name="message"
                    autoComplete="off"
                    placeholder="Type your message..."
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                    formik.touched.message && formik.errors.message ? (
                        <FieldDescription className="text-red-500">
                            {formik.errors.message}
                        </FieldDescription>
                    ) : null
                }
            </Field>

        </form >
    )
}