import { Answer } from "./Answer";

export type Question = {
    id: number;
    title: string;
    timeMinutes?: number;
    imageData?: string | null;
    answerType: string; //"single" | "multi";
    answerVariants: Answer[];
};

export type QuestionView = Question & {
    isAnswered: boolean;
};
