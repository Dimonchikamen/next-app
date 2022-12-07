import { FC, useState } from "react";
import { Answer } from "../../types/Answer";
import RadioButton from "../RadioButton/RadioButton";
import s from "./Question.module.scss";

interface IQuestionProps {
    questionTitle: string;
    answerVariants: Answer[];
    onClickAnswer?: (answer: string) => void;
}

const Question: FC<IQuestionProps> = ({ questionTitle, answerVariants, onClickAnswer }) => {
    const [checkedAnswer, setCheckedAnswer] = useState("");

    const clickCheckedHandler = (answer: string) => {
        setCheckedAnswer(answer);
        onClickAnswer?.(answer);
    };

    return (
        <div className={s.question}>
            <h4 className={s.title}>{questionTitle}</h4>
            <div className={s.answers}>
                {answerVariants.map((a, i) => {
                    return (
                        <RadioButton
                            key={i}
                            className={s.answer_container}
                            value={a.title}
                            label={a.title}
                            checked={a.title === checkedAnswer}
                            onClick={(_, v) => clickCheckedHandler(v)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Question;
