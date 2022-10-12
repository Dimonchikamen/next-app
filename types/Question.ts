import { Answer } from "./Answer";

export type Question = {
    title: string;
    time: string;
    imageURL?: string;
    answerType: "single" | "multi";
    answerVariants: Answer[];
};
