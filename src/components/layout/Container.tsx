import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps<T extends React.ElementType = "div"> = {
    as?: T;
    className?: string;
    children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function Container<T extends React.ElementType = "div">({
    as,
    className,
    children,
    ...props
}: ContainerProps) {
    const Component = as || "div";

    return (
        <Component
            className={cn(
                "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
                "text-foreground",
                className,
            )}
            {...props}
        >
            {children}
        </Component>
    );
}
