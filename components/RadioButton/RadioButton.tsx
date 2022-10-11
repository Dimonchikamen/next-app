import React, { FC, useEffect, useState } from "react";
import s from "./RadioButton.module.scss";

interface IRadioButtonPresentationProps {
    label: string;
    checked: boolean;
    disabled?: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const RadioButtonPresentation: FC<IRadioButtonPresentationProps> = ({ label, checked, disabled = false, onClick }) => {
    const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled) onClick(e);
    };
    return (
        <div
            className={s.container}
            onClick={clickHandler}
        >
            <div className={`${s.radio_container} ${checked ? s.checked : ""} ${disabled ? s.disabled : ""} `}>
                {checked && <div className={s.radio} />}
            </div>
            <label>{label}</label>
        </div>
    );
};

interface IRadioButtonProps {
    label: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>, value: string) => void;
}

const RadioButton: FC<IRadioButtonProps> = ({ label, value, checked = false, disabled, onClick }) => {
    const [checkedState, setChecked] = useState(checked);

    useEffect(() => {
        if (checked !== checkedState) setChecked(checked);
    }, [checked]);

    const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setChecked(true);
        onClick?.(e, value);
    };

    return (
        <RadioButtonPresentation
            label={label}
            disabled={disabled}
            checked={checkedState}
            onClick={clickHandler}
        />
    );
};

export default RadioButton;
