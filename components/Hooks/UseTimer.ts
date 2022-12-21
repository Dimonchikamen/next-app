import { useEffect, useState } from "react";

const useTimer = (time: number, hook: any) => {
    const [timerInSeconds, setTimerInSeconds] = hook("timer", time ? time * 60 : 0);
    const [testTime, setTestTime] = useState("");
    useEffect(() => {
        const time = setTimeout(() => {
            if (timerInSeconds.valueOf() && timerInSeconds.valueOf() !== 0) {
                setTimerInSeconds((prev: number) => prev! - 1);
                setTestTime(
                    `${Math.floor(timerInSeconds / 60)}:${
                        Math.floor(timerInSeconds % 60) < 10
                            ? `0${Math.floor(timerInSeconds % 60)}`
                            : Math.floor(timerInSeconds % 60)
                    }`
                );
            } else {
                setTestTime(`00:00`);
            }

            return () => clearTimeout(time);
        }, 1000);
    }, [timerInSeconds]);
    return testTime;
};

export default useTimer;
