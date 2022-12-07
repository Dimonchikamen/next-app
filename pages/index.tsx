import type { NextPage } from "next";
import { FC, useState } from "react";
import Header from "../components/Header/Header";
import NavSidebar from "../components/NavSidebar/NavSidebar";
import styles from "../styles/Home.module.css";
import QuestionForm from "../components/QuestionForm/QuestionForm";

interface ILinkBlockProps {
    title: string;
    text: string;
    href: string;
}
const LinkBlock: FC<ILinkBlockProps> = ({ title, text, href }) => {
    return (
        <a
            href={href}
            className={styles.card}
        >
            <h2>{title}</h2>
            <p>{text}</p>
        </a>
    );
};

const Home: NextPage = () => {
    const q = [];
    for (let i = 0; i < 50; i++) q.push({ id: i, isAnswered: i % 2 === 0 });
    const [active, setActive] = useState(0);

    return (
        <div className={styles.page}>
            <NavSidebar
                questions={q}
                activeQuestion={active}
                onSelectQuestion={setActive}
            />
            <div className={styles.container}>
                <Header
                    answers={3}
                    questions={20}
                    testTitle={"Русь и золотая орда"}
                    testTimeLeft={"60:30"}
                />
                <main className={styles.main}></main>
            </div>
        </div>
    );
};

export default Home;
