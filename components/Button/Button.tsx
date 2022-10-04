import React, { FC, MouseEventHandler } from "react";
import s from "./Button.module.scss";

interface IButtonProps {
    className?: string;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    title: string;
}

const Button: FC<IButtonProps> = ({ className, disabled, title, onClick }) => {
    return (
        <button
            className={`${s.button} ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default Button;
