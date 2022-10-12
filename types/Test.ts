import { Question } from "./Question";

export type Test = {
    id: number;
    title: string;
    time: string;
    navigationType: "consistently" | "free";
    questions: Question[];
};
