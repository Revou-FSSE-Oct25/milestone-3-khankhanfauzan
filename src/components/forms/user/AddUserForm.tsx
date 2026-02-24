"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SafeImage from "@/components/common/SafeImage";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUser, checkUserEmailAvailability } from "@/services/api";
import { isValidEmail } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type UserFormValues = {
    name: string;
    email: string;
    password: string;
    avatar: string;
    role: "customer" | "admin";
};

function AddUserForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<UserFormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            avatar: "",
            role: "customer",
        },
    });

    const avatarValue = watch("avatar") || "";

    const onSubmitForm = async (data: UserFormValues) => {
        setEmailError(null);

        if (!isValidEmail(data.email)) {
            setEmailError("Please enter a valid email address");
            return;
        }

        try {
            const availability = await checkUserEmailAvailability(data.email);
            if (!availability.isAvailable) {
                setEmailError("Email is already in use");
                return;
            }
        } catch (error) {
            setEmailError("Unable to verify email availability");
            return;
        }

        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            avatar: data.avatar.trim() || "https://picsum.photos/800",
            role: data.role,
        };

        try {
            setIsLoading(true);
            await createUser(payload);
            router.push("/admin/users");
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        type="text"
                        placeholder="user name"
                        title="please enter a user name"
                        {...register("name", {
                            required: "Name is required",
                            minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters",
                            },
                        })}
                    />
                    {errors.name && (
                        <div className="text-sm text-red-500 mt-1">
                            {errors.name.message}
                        </div>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        title="please enter a user email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {(errors.email || emailError) && (
                        <div className="text-sm text-red-500 mt-1">
                            {errors.email?.message || emailError}
                        </div>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        type="password"
                        placeholder="password"
                        title="please enter a user password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 4,
                                message:
                                    "Password must be at least 4 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <div className="text-sm text-red-500 mt-1">
                            {errors.password.message}
                        </div>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="avatar">Avatar</FieldLabel>
                    <div className="flex items-center gap-2">
                        {avatarValue.trim() && (
                            <SafeImage
                                src={avatarValue.trim()}
                                width={64}
                                height={64}
                                className="rounded-sm border border-neutral-800 object-cover aspect-square"
                            />
                        )}
                        <Input
                            id="avatar"
                            type="url"
                            placeholder="https://picsum.photos/800"
                            title="please enter an avatar URL"
                            {...register("avatar")}
                        />
                    </div>
                </Field>

                <Field>
                    <FieldLabel htmlFor="role">Role</FieldLabel>
                    <Select
                        value={watch("role")}
                        onValueChange={(value) =>
                            // react-hook-form controlled via setValue through register("role") is simpler,
                            // but here we use onValueChange + register for the initial value.
                            // We still rely on watch("role") for current value.
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (register("role").onChange as any)({
                                target: { value },
                            })
                        }
                    >
                        <SelectTrigger id="role">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="customer">Customer</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create User"}
                </Button>
            </FieldGroup>
        </form>
    );
}

export default AddUserForm;
