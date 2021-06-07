import {h} from 'preact'
import {useCallback} from 'preact/hooks';
import {useState} from "preact/hooks";
import cn from 'classnames';
import {useTranslation} from "react-i18next";

import i18n from '../../../../i18n';
const questions = [{
    header: i18n.t('Landing.Questions.Item1Title'),
    body: i18n.t('Landing.Questions.Item1Text')
}, {
    header: i18n.t('Landing.Questions.Item2Title'),
    body: i18n.t('Landing.Questions.Item2Text')
}, {
    header: i18n.t('Landing.Questions.Item3Title'),
    body: i18n.t('Landing.Questions.Item3Text')
}, {
    header: i18n.t('Landing.Questions.Item4Title'),
    body: i18n.t('Landing.Questions.Item4Text')
}, {
    header: i18n.t('Landing.Questions.Item5Title'),
    body: i18n.t('Landing.Questions.Item5Text')
}];

import s from './Accordeon.module.scss'


const Accordeon = () => {
    const {t} = useTranslation();

    const [selectedIndex, setSelectedIndex] = useState('-1');
    const [height, setHeight] = useState(0);

    const show = useCallback(({currentTarget}) => {
        if (currentTarget.dataset.index == selectedIndex) {
            setSelectedIndex('-1');
        } else {
            setSelectedIndex(currentTarget.dataset.index);
            const body = currentTarget.querySelector(`.${s.body}`);
            setHeight(body.scrollHeight);
        }
    }, [selectedIndex]);

    return (
        <div className={s.questions}>
            {questions.map(({header, body}, index) => (
                <div className={cn(s.question, {[s.selected]: selectedIndex == index})}
                    onClick={show} data-index={index}>
                    <div className={s.header} >
                        {header}
                        <svg className={s.arrow} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.885 12.8848L18 19.7548L11.115 12.8848L9 14.9998L18 23.9998L27 14.9998L24.885 12.8848Z" fill="#fff" />
                        </svg>
                    </div>
                    <div className={cn(s.body)} style={{maxHeight: selectedIndex == index ? `${height}px` : 0, margin: selectedIndex == index ? "14px 0 26px 0" : "0"}}
                        dangerouslySetInnerHTML={{__html: body}} />
                </div>
            ))}
        </div>
    )
}

export default Accordeon
