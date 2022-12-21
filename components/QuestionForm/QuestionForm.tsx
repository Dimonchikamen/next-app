import React, { FC, useState, useCallback } from "react";
import QuestionTimer from "../QuestionTimer/QuestionTimer";
import Question from "../Question/Question";
import Button from "../Button/Button";
import s from "./QuestionForm.module.scss";
import { QuestionView } from "../../types/Question";

interface IQuestionFormProps {
    question: QuestionView;
    onSubmitAnswer: (answer: string | number) => void;
    onSkipAnswer: () => void;
    onEndTest: () => void;
}

const QuestionForm: FC<IQuestionFormProps> = ({ question, onSubmitAnswer, onSkipAnswer, onEndTest }) => {
    const [answer, setAnswer] = useState("");

    const endTest = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            onEndTest();
        },
        [onEndTest]
    );

    const skip = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            onSkipAnswer();
        },
        [onSkipAnswer]
    );

    const submitHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            onSubmitAnswer(answer);
        },
        [answer, onSubmitAnswer]
    );

    return (
        <form className={s.form}>
            {question.timeMinutes && (
                <div className={s.question_timer_container}>
                    <QuestionTimer totalTime={question.timeMinutes * 60} />
                </div>
            )}

            <Question
                questionTitle={question.title}
                answerVariants={question.answerVariants}
                onClickAnswer={setAnswer}
            />
            <div className={s.action_button_group}>
                <Button
                    className={s.skip_button}
                    title="Завершить тест"
                    onClick={endTest}
                />
                <Button
                    className={s.skip_button}
                    title="Пропустить"
                    onClick={skip}
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
