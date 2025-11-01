import { Input } from "@/components/ui/input"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import type { UserForm } from "@/bussines_rules/share/domain/user.entity";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
    username: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, "username can only contain letters and numbers")
        .min(2, "username must be at least 2 characters")
        .max(50, "username must be at most 50 characters")
        .required("username is required"),
});

export interface FormState {
    userForm: UserForm;
    isValid: boolean;
}

export interface UserNameFormProps {
    userForm: UserForm;
    onChange: (formState: FormState) => void;
    onPressEnter?: () => Promise<void>;
}

export const UserNameForm = (props: UserNameFormProps) => {

    const { userForm, onChange, onPressEnter } = props;

    const formik = useFormik({
        initialValues: userForm,
        validationSchema,
        validateOnMount: true,
        onSubmit: async (values: UserForm) => {
            // You can handle form submission here if needed
            // For now, just log the values to avoid unused variable error
            console.log(values);
        },
    });

    useEffect(() => {
        onChange({
            userForm: formik.values,
            isValid: formik.isValid,
        });
        return () => onChange({ userForm: formik.values, isValid: formik.isValid });
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
                    id="username"
                    name="username"
                    autoComplete="off"
                    placeholder="Evil Rabbit"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                    formik.touched.username && formik.errors.username ? (
                        <FieldDescription className="text-red-500">
                            {formik.errors.username}
                        </FieldDescription>
                    ) : null
                }
            </Field>

        </form >
    );
};
