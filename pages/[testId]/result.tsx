import { NextPage } from "next";
import { QUESTIONS_KEY } from "../../Constants";
import { TestAnswers } from "../../types/TestAnswers";
import { dbName, mongoClient } from "../../types/utils/file";

const Result: NextPage = ({ data }: any) => {
    console.log(data);
    const answers = JSON.parse(localStorage.getItem(QUESTIONS_KEY)!) as { id: number; answer: string | number }[];
    const res: { answer: string | number; isTrue: boolean }[] = [];
    for (let i = 0; i < answers.length; i++) {
        const ans = answers[i];
        const index = data.findIndex((q: any) => q.id === ans.id);
        res.push({ answer: ans.answer, isTrue: ans.answer === data[index].answer });
    }
    return (
        <div>
            <ul>
                {res.map((a: { answer: string | number; isTrue: boolean }, i: number) => {
                    return (
                        <li key={i}>
                            <h2>
                                {i + 1}. {a.answer} -{" "}
                                <span style={{ color: a.isTrue ? "lightgreen" : "red" }}>
                                    {a.isTrue ? "Верно!" : "Неверно"}
                                </span>
                            </h2>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export async function getServerSideProps({ params }: any) {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    //const answers = JSON.parse(localStorage.getItem(QUESTIONS_KEY)!) as { id: number; answer: string | number }[];
    const anwersCol = db.collection("answers");
    console.log(anwersCol);
    const currentTest = (await anwersCol.findOne({ id: Number(params.testId) })) as unknown as TestAnswers;
    console.log(currentTest);
    const questions = [...currentTest.questions];
    // for (let i = 0; i < answers.length; i++) {
    //     const ans = answers[i];
    //     const index = currentTest.questions.findIndex(q => q.id === ans.id);
    //     res.push({ answer: ans.answer, isTrue: ans.answer === currentTest.questions[index].answer });
    // }

    // const data = (await col.findOne({ id: Number(params.testId) })) as unknown as Test;
    // const allQuestionId = data.questions.map(q => q.id);
    // const question = data.questions.find(q => q.id === Number(params.questionId));
    const resultData = {
        questions,
        // title: data.title,
        // navigationType: data.navigationType,
        // testTime: data.timeMinutes,
        // activeQuestionId: question?.id,
        // allQuestionId,
        // question,
    };

    return {
        props: { data: questions },
    };
}

export default Result;
