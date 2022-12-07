import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import useTimer from "../../components/Hooks/UseTimer";
import NavSidebar from "../../components/NavSidebar/NavSidebar";
import QuestionForm from "../../components/QuestionForm/QuestionForm";
import styles from "../../styles/Home.module.css";
import { Test } from "../../types/Test";
import TestsMock from "../../Mocks/TestsMock.json";
import { QuestionView } from "../../types/Question";
import singleTestMock from "../../Mocks/SingleTestMock.json";

const QuestionPage: NextPage = () => {
    const { testId, questionId } = useRouter().query;
    const [answers, setAnswers] = useState<(string | number)[]>([]);
    const [active, setActive] = useState(0);
    const test: Test = singleTestMock; //(TestsMock as unknown as Test[]).filter(t => t.id === parseInt(testId as string))[0];
    console.log("tewererwerwr", test);
    const timer = useTimer(5); //test.timeMinutes);
    const questions: QuestionView[] = useMemo(() => test.questions.map(p => ({ ...p, isAnswered: false })), [test]);
    const currentQuestion = questions[active];

    const submitAnswerhandler = useCallback(
        (answer: string | number) => {
            questions[active].isAnswered = true;
            const res = [...answers];
            res[active] = answer;
            setAnswers(res);
        },
        [questions, active, answers]
    );

    const skipHandler = useCallback(() => {}, []);

    return (
        <div className={styles.page}>
            <NavSidebar
                questions={questions}
                activeQuestionId={questions[active].id}
                onSelectQuestion={setActive}
            />
            <div className={styles.container}>
                <Header
                    answers={answers.filter(t => Boolean(t)).length}
                    questions={20}
                    testTitle={"Русь и золотая орда"}
                    testTimeLeft={timer}
                />
                <main className={styles.main}>
                    <QuestionForm
                        question={currentQuestion}
                        onSubmitAnswer={submitAnswerhandler}
                        onSkipAnswer={skipHandler}
                    />
                </main>
            </div>
        </div>
    );
};
export default QuestionPage;
