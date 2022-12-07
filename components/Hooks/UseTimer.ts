import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

const useTimer = (time: number) => {
    const [timerInSeconds, setTimerInSeconds] = useLocalStorage<number>("timer", time ? time * 60 : 0);
    const [testTime, setTestTime] = useState("");
    useEffect(() => {
        const time = setTimeout(() => {
            if (timerInSeconds.valueOf() && timerInSeconds.valueOf() !== 0) {
                setTimerInSeconds(prev => prev! - 1);
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
