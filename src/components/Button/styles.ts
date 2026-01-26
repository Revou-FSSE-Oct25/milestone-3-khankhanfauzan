import { ButtonVariant } from "./types";

const baseStyles = 'rounded-md font-semibold transition duration-150 ease-in-out disabled:opacity-50';


const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-blue-500 px-2 py-1 hover:bg-blue-600",
    secondary: "border text-blue-500 border-blue-500 px-2 py-1 hover:border-blue-600",
}

export const getButtonClasses = (variant: ButtonVariant) => {
    return `${baseStyles} ${variantStyles[variant]}`;

}