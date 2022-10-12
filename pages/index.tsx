import type { NextPage } from "next";
import { FC } from "react";
import Button from "../components/Button/Button";
import CheckBox from "../components/CheckBox/CheckBox";
import InformationComponent from "../components/InformationComponent/InformationComponent";
import QuestionTimer from "../components/QuestionTimer/QuestionTimer";
import RadioButton from "../components/RadioButton/RadioButton";
import styles from "../styles/Home.module.css";

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
    return (
        <div className={styles.container}>
            <header></header>
            <main className={styles.main}>
                <QuestionTimer
                    time="1:45"
                    procentLeft={75}
                />
                <InformationComponent
                    imageURL="/question.svg"
                    text="8/20"
                />
                <InformationComponent
                    imageURL="/clock.svg"
                    text="60:00"
                />
                <Button
                    title="Создать игру"
                    disabled={true}
                />
                <form>
                    <RadioButton
                        label="qwe"
                        value="qwe"
                    />
                    <RadioButton
                        label="ww"
                        value="ww"
                        disabled={true}
                    />
                    <CheckBox
                        value="qwe"
                        label="qwe?"
                    />
                    <CheckBox
                        value="tre"
                        label="tre?"
                        disabled={true}
                    />
                </form>
            </main>
            <footer className={styles.footer}></footer>
        </div>
    );
};

export default Home;
