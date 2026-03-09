import type{ ButtonVariant } from "../types/common";

type ButtonProps = {
    variant: ButtonVariant;
    onClick: () => void;
    children: React.ReactNode;
}

function Button({ variant, onClick, children }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            data-variant={variant}>
            {children}
        </button>
    );
}

export default Button;

