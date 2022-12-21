import { FC } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useSessionStorage from "../Hooks/useSessionStorage";
import useTimer from "../Hooks/UseTimer";
import s from "./QuestionTimer.module.scss";

interface IQuestionTimeProps {
    totalTime: number;
}

const QuestionTimer: FC<IQuestionTimeProps> = ({ totalTime }) => {
    //const timer = useTimer(totalTime, useSessionStorage);
    const pi = 3.14159265358979;
    const circumference = 2 * pi * 60;
    // const a = (percentLeft / 100) * circumference;
    return (
        <>
            {/* <div className={s.container}>
            <span className={s.time}>{time}</span>
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
        </div> */}
            <CountdownCircleTimer
                isPlaying
                duration={totalTime ? totalTime : 0}
                colors={["#00EAD9", "#00EAD9"]}
                colorsTime={[totalTime, 0]}
                strokeLinecap="square"
                trailStrokeWidth={4}
                trailColor="#fff"
                strokeWidth={4}
                size={120}
            >
                {({ remainingTime }) => (
                    <div className="text-2xl">
                        {`${Math.floor(remainingTime / 60)}:${
                            Math.floor(remainingTime % 60) === 0
                                ? "00"
                                : Math.floor(remainingTime % 60) < 10
                                ? `0${Math.floor(remainingTime % 60)}`
                                : Math.floor(remainingTime % 60)
                        }`}
                    </div>
                )}
            </CountdownCircleTimer>
        </>
    );
};

export default QuestionTimer;
