import React, { FC, useEffect, useState } from "react";
import s from "./CheckBox.module.scss";

interface ICheckBoxProps {
    value: string;
    className?: string;
    label?: string;
    disabled?: boolean;
    checked?: boolean;
    onClick?: (e: React.MouseEvent<HTMLLabelElement>, value: string) => void;
}

const CheckBox: FC<ICheckBoxProps> = ({ value, checked, disabled, label, onClick }) => {
    const [checkedState, setChecked] = useState(checked);

    useEffect(() => {
        if (checked !== checkedState) setChecked(checked);
    }, [checked]);

    const clickHandler = (e: React.MouseEvent<HTMLLabelElement>) => {
        setChecked(true);
        onClick?.(e, value);
    };
    return (
        <label
            className={`${s.form_control} `}
            onClick={clickHandler}
        >
            <input
                className={`${s.check_box} `}
                checked={checked}
                disabled={disabled}
                type={"checkbox"}
            />
            {label}
        </label>
    );
};

export default CheckBox;
