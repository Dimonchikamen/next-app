import { FC } from "react";
import s from "./NavSidebar.module.scss";
import Image from "next/image";

interface INavElementProps {
    number: number;
    isActive: boolean;
    isAnswered: boolean;
}

const NavElement: FC<INavElementProps> = ({ number, isAnswered, isActive }) => {
    return (
        <div className={`${s.nav_element} ${isAnswered ? s.answered : ""} ${isActive ? s.active : ""}`}>{number}</div>
    );
};

interface INavSidebarProps {
    questions: { id: number; isAnswered: boolean }[];
    activeQuestionId: number;
    onSelectQuestion: (number: number) => void;
}

const NavSidebar: FC<INavSidebarProps> = ({ questions, activeQuestionId, onSelectQuestion }) => {
    return (
        <div className={s.nav_sidebar}>
            <div className={s.icon_container}>
                <Image
                    src="/icon.svg"
                    alt=""
                    height={18}
                    width={10}
                />
            </div>
            <ul className={s.list}>
                {questions.map((q, i) => {
                    return (
                        <li
                            key={q.id}
                            onClick={() => onSelectQuestion(q.id)}
                        >
                            <NavElement
                                number={i + 1}
                                isActive={q.id === activeQuestionId}
                                isAnswered={q.isAnswered}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default NavSidebar;
