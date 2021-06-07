import {h} from 'preact';

import {useTranslation} from "react-i18next";

import s from './Questions.module.scss';
import Heading from '../components/Heading';
import Accordeon from './Accordeon';




const Questions = ({rowClass}) => {
   
    const {t} = useTranslation();

    return (
        <section className={s.faq}>
            <div className={rowClass} >
                <div className={s.wrapper}>
                    <div className={s.container}>
                        <Heading color="white" text={t('Landing.Questions.Header')} />
                       <Accordeon />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Questions;
