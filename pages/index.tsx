import type { NextPage } from "next";
import { FC } from "react";
import Button from "../components/Button/Button";
import CheckBox from "../components/CheckBox/CheckBox";
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
            <main className={styles.main}>
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
