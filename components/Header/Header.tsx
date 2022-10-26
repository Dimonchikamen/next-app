import { FC } from "react";
import Image from "next/image";
import InformationComponent from "../InformationComponent/InformationComponent";
import s from "./Header.module.scss";

interface IHeaderProps {
    answers: number;
    questions: number;
    testTimeLeft: string;
    testTitle: string;
}

const Header: FC<IHeaderProps> = ({ answers, questions, testTimeLeft, testTitle }) => {
    return (
        <header className={s.header}>
            <div className={s.test_information_container}>
                <InformationComponent
                    imageURL="/question.svg"
                    text={`${answers}/${questions}`}
                />
                <InformationComponent
                    imageURL="/clock.svg"
                    text={testTimeLeft}
                />
            </div>
            <span className={s.test_title}>{testTitle.toUpperCase()}</span>
            <div className={s.logo_container}>
                <Image
                    layout="fill"
                    src="/Logo.svg"
                    alt="logo"
                />
            </div>
        </header>
    );
};

export default Header;
