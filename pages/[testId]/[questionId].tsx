import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import Header from "../../components/Header/Header";
import useTimer from "../../components/Hooks/UseTimer";
import NavSidebar from "../../components/NavSidebar/NavSidebar";
import QuestionForm from "../../components/QuestionForm/QuestionForm";
import { QUESTIONS_KEY } from "../../Constants";
import styles from "../../styles/Home.module.css";
import { NavigationType } from "../../types/NavigationType";
import { Test } from "../../types/Test";
import { mongoClient, dbName } from "../../types/utils/file";

let answers: { id: number; answer: string | number }[] = [];

const IsEqualQuestions = (current: number[]) => {
    if (answers.length !== current.length) return true;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].id !== current[i]) return true;
    }
    return false;
};

const QuestionPage: NextPage = ({
    data: { allQuestionId, title, testTime, activeQuestionId, navigationType, question },
}: any) => {
    const isOtherQuestions = IsEqualQuestions(allQuestionId);
    const [localQuestions, setQuestions] = useState<{ id: number; isAnswered: boolean }[]>([]);
    const router = useRouter();
    const timer = useTimer(testTime, useLocalStorage);

    useEffect(() => {
        const res = allQuestionId.map((e: number) => ({ id: e, isAnswered: false }));
        answers = allQuestionId.map((e: number) => ({ id: e, answer: "" }));
        setQuestions(res);
    }, [isOtherQuestions]);

    useEffect(() => {
        if (navigationType === NavigationType.consistently) {
            const index = localQuestions.findIndex(q => q.id === activeQuestionId);
            console.log(localQuestions);
            if (index !== -1 && index !== 0 && !localQuestions[index - 1].isAnswered) {
                let lastIndex = 0;
                for (let i = localQuestions.length - 1; i >= 0; i--) {
                    if (localQuestions[i].isAnswered) {
                        lastIndex = i + 1;
                        break;
                    }
                }
                const currentQuestionId = localQuestions[lastIndex].id;
                router.push(`/${router.query.testId}/${currentQuestionId}`);
            }
        }
    }, [activeQuestionId]);

    const goToNextPage = () => {
        const index = localQuestions.findIndex(q => q.id === activeQuestionId);

        if (index !== localQuestions.length - 1) {
            router.push(`/${router.query.testId}/${localQuestions[index + 1].id}`);
        }
    };

    const submitAnswerhandler = (answer: string | number) => {
        setQuestions(prev => {
            const copy = [...prev];
            const index = copy.findIndex(q => q.id === activeQuestionId);
            copy[index].isAnswered = true;
            answers[index].answer = answer;
            console.log(copy);
            return copy;
        });
        goToNextPage();
    };

    const selectQuestion = (quetionId: number) => {
        if (navigationType === NavigationType.free) {
            router.push(`/${router.query.testId}/${quetionId}`);
        }
    };

    const skipHandler = () => {
        goToNextPage();
    };

    const endTestHandler = () => {
        localStorage.setItem(QUESTIONS_KEY, JSON.stringify(answers));
        router.push(`/${router.query.testId}/result`);
    };

    return (
        <div className={styles.page}>
            <NavSidebar
                questions={localQuestions}
                activeQuestionId={activeQuestionId}
                onSelectQuestion={selectQuestion}
            />
            <div className={styles.container}>
                <Header
                    answers={localQuestions.filter(q => q.isAnswered).length}
                    questions={allQuestionId.length}
                    testTitle={title}
                    testTimeLeft={timer}
                />
                <main className={styles.main}>
                    <QuestionForm
                        question={question}
                        onSubmitAnswer={submitAnswerhandler}
                        onSkipAnswer={skipHandler}
                        onEndTest={endTestHandler}
                    />
                </main>
            </div>
        </div>
    );
};

export default QuestionPage;

export async function getServerSideProps({ params }: any) {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const col = db.collection("tests");
    const data = (await col.findOne({ id: Number(params.testId) })) as unknown as Test;
    const allQuestionId = data.questions.map(q => q.id);
    const question = data.questions.find(q => q.id === Number(params.questionId));
    const resultData = {
        title: data.title,
        navigationType: data.navigationType,
        testTime: data.timeMinutes,
        activeQuestionId: question?.id,
        allQuestionId,
        question,
    };

    return {
        props: { data: resultData },
    };
}
