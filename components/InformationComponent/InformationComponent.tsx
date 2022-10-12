import { FC } from "react";
import Image from "next/image";
import s from "./InformationComponent.module.scss";

interface IInformationComponentProps {
    imageURL: string;
    text: string;
}

const InformationComponent: FC<IInformationComponentProps> = ({ imageURL, text }) => {
    return (
        <div className={s.info_container}>
            <div className={s.image_contaier}>
                <Image
                    className={s.info_image}
                    layout="fill"
                    src={imageURL}
                    alt="image"
                />
            </div>
            <span>{text}</span>
        </div>
    );
};

export default InformationComponent;
