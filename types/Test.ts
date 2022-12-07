import { Question } from "./Question";

export type Test = {
    id: number;
    title: string;
    timeMinutes: number;
    navigationType: string; //"consistently" | "free";
    questions: Question[];
};
