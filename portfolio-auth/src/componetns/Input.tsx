import type{ ChangeEvent } from "react";

interface InputProps {
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

function Input({ type, value, onChange, placeholder }: InputProps) {
    return (
        <input 
            type={type} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
        />
    );
}

export default Input;
