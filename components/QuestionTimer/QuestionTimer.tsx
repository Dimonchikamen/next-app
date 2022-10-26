import { FC } from "react";
import s from "./QuestionTimer.module.scss";

interface IQuestionTimeProps {
    time: string;
    percentLeft: number;
}

const QuestionTimer: FC<IQuestionTimeProps> = ({ time, percentLeft }) => {
    const pi = 3.14159265358979;
    const circumference = 2 * pi * 60;
    const a = (percentLeft / 100) * circumference;
    return (
        <div className={s.container}>
            <span className={s.time}>01:45</span>
            <svg
                className={s.svg}
                x="0px"
                y="0px"
                viewBox="0 0 122 122"
            >
                <circle
                    style={{ transform: `scaleX(-1) translateX(-${121}px) rotate(-90deg) translateX(-${121}px);` }}
                    fill="white"
                    strokeWidth="2px"
                    stroke="#00EAD9"
                    strokeDasharray={`${a} ${circumference}`}
                    cx="60"
                    cy="60"
                    r="60"
                />
            </svg>
        </div>
    );
};

export default QuestionTimer;
