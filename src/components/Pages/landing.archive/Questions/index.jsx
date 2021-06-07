import {h} from 'preact';
import {useCallback} from 'preact/hooks';
import {useState} from "preact/hooks";
import cn from 'classnames';
import s from './style.module.css';
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


const Lines = ({className}) => (
    <svg className={cn(s.lines, className)} xmlns="http://www.w3.org/2000/svg" width="1216" height="142"
         viewBox="0 0 1216 142"
         fill="none">
        <path d="M129 -599V138V138C129 185.496 167.504 224 215 224H508C572.065 224 624 275.935 624 340V340"
              stroke="black" stroke-width="2"/>
        <path d="M113 -599V138V138C113 194.333 158.667 240 215 240H508C563.228 240 608 284.772 608 340V340"
              stroke="black" stroke-width="2"/>
        <path d="M97 -599V138V138C97 203.17 149.83 256 215 256H508C554.392 256 592 293.608 592 340V340"
              stroke="black"
              stroke-width="2"/>
        <circle cx="97" cy="4" r="4" fill="black"/>
        <circle cx="97" cy="138" r="4" fill="black"/>
        <circle cx="113" cy="4" r="4" fill="black"/>
        <circle cx="113" cy="138" r="4" fill="black"/>
        <circle cx="129" cy="4" r="4" fill="black"/>
        <circle cx="129" cy="138" r="4" fill="black"/>
    </svg>
);


const Questions = () => {
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
    const {t} = useTranslation();

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                {/* <Header bottomRightCornerGreen>{t('Landing.Questions.Header')}</Header> */}
                <Lines/>
                <div className={s.questions}>
                    {questions.map(({header, body}, index) => (
                        <div className={cn(s.question, {[s.selected]: selectedIndex == index})}
                             onClick={show} data-index={index}>
                            <div className={s.header}>
                                {header}

                                <svg className={s.arrow} width="36" height="36" viewBox="0 0 36 36" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M24.885 12.8848L18 19.7548L11.115 12.8848L9 14.9998L18 23.9998L27 14.9998L24.885 12.8848Z"
                                        fill="black"/>
                                </svg>
                            </div>

                            <div className={s.body} style={{maxHeight: selectedIndex == index ? `${height}px` : 0}}
                                 dangerouslySetInnerHTML={{__html: body}}/>
                        </div>
                    ))}
                </div>
                <Lines className={s.bottomLines}/>
            </div>
        </div>
    );
};

export default Questions;
