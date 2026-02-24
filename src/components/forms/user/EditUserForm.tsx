"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SafeImage from "@/components/common/SafeImage";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUserById, checkUserEmailAvailability } from "@/services/api";
import { isValidEmail } from "@/lib/utils";
import type { User } from "@/lib/definitions";
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
    avatar: string;
    role: "customer" | "admin";
};

function EditUserForm({ user }: { user: User }) {
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
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
        },
    });

    const avatarValue = watch("avatar") || "";

    const onSubmitForm = async (data: UserFormValues) => {
        setEmailError(null);

        if (!isValidEmail(data.email)) {
            setEmailError("Please enter a valid email address");
            return;
        }

        if (data.email !== user.email) {
            try {
                const availability = await checkUserEmailAvailability(
                    data.email,
                );
                if (!availability.isAvailable) {
                    setEmailError("Email is already in use");
                    return;
                }
            } catch (error) {
                setEmailError("Unable to verify email availability");
                return;
            }
        }

        const payload = {
            email: data.email,
            name: data.name,
            role: data.role,
        };

        try {
            setIsLoading(true);
            await updateUserById(user.id, payload);
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
                    {isLoading ? "Updating..." : "Update User"}
                </Button>
            </FieldGroup>
        </form>
    );
}

export default EditUserForm;
