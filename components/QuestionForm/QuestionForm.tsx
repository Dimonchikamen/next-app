import React, { FC, useState, memo, useEffect, useCallback } from "react";
import QuestionTimer from "../QuestionTimer/QuestionTimer";
import Question from "../Question/Question";
import Button from "../Button/Button";
import s from "./QuestionForm.module.scss";
import { QuestionView } from "../../types/Question";

interface IQuestionFormProps {
    question: QuestionView;
    onSubmitAnswer: (answer: string | number) => void;
    onSkipAnswer: () => void;
}

const QuestionForm: FC<IQuestionFormProps> = ({ question, onSubmitAnswer, onSkipAnswer }) => {
    const [answer, setAnswer] = useState("");

    const submitHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            onSubmitAnswer(answer);
        },
        [answer, onSubmitAnswer]
    );

    return (
        <form className={s.form}>
            <div className={s.question_timer_container}>
                <QuestionTimer
                    time="14:00"
                    percentLeft={80}
                />
            </div>

            <Question
                questionTitle="С именем какого человек у вас ассоциируется сожжение Москвы?"
                answerVariants={question.answerVariants}
                onClickAnswer={setAnswer}
            />
            <div className={s.action_button_group}>
                <Button
                    className={s.skip_button}
                    title="Пропустить"
                    onClick={onSkipAnswer}
                />
                <Button
                    title="Ответить"
                    disabled={answer === ""}
                    onClick={submitHandler}
                />
            </div>
        </form>
    );
};

export default QuestionForm;
