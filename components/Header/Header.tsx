import { FC } from "react";
import Image from "next/image";
import InformationComponent from "../InformationComponent/InformationComponent";

interface IHeaderProps {
    answers: number;
    questions: number;
    testTimeLeft: string;
    testTitle: string;
}

const Header: FC<IHeaderProps> = ({ answers, questions, testTimeLeft, testTitle }) => {
    return (
        <header>
            <div>
                <InformationComponent
                    imageURL="/question.svg"
                    text={`${answers}/${questions}`}
                />
                <InformationComponent
                    imageURL="/clock.svg"
                    text={testTimeLeft}
                />
            </div>
            <span>{testTimeLeft}</span>
            <div>
                <Image
                    src="/Logo.svg"
                    alt="logo"
                />
            </div>
        </header>
    );
};
