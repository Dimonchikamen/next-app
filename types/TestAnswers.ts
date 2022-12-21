export type TestAnswers = {
    testId: number;
    questions: {
        id: number;
        answerType: string;
        answer: string | number;
    }[];
};
