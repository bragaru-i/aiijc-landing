import {h} from 'preact';
import Header from '../Header';
import Number from './Number';
import Prize from "./Prize";
import s from './style.module.css';
import {useTranslation} from 'react-i18next';

const Lines = () => (
    <svg className={s.lines} xmlns="http://www.w3.org/2000/svg" width="1216" height="142" viewBox="0 0 1216 142"
         fill="none">
        <path d="M129 -599V138V138C129 185.496 167.504 224 215 224H508C572.065 224 624 275.935 624 340V340"
              stroke="black" stroke-width="2"/>
        <path d="M113 -599V138V138C113 194.333 158.667 240 215 240H508C563.228 240 608 284.772 608 340V340"
              stroke="black" stroke-width="2"/>
        <path d="M97 -599V138V138C97 203.17 149.83 256 215 256H508C554.392 256 592 293.608 592 340V340" stroke="black"
              stroke-width="2"/>
        <circle cx="97" cy="4" r="4" fill="black"/>
        <circle cx="97" cy="138" r="4" fill="black"/>
        <circle cx="113" cy="4" r="4" fill="black"/>
        <circle cx="113" cy="138" r="4" fill="black"/>
        <circle cx="129" cy="4" r="4" fill="black"/>
        <circle cx="129" cy="138" r="4" fill="black"/>
    </svg>
);


const Stages = () => {
    const {t} = useTranslation();
    return (
        <div className={s.container}>
            <Header topLeftCornerGreen>{t('Landing.Stages.Header')}</Header>
            <div className={s.stages}>
                <Lines/>
                <div className={s.stage}>
                    <Number>01</Number>
                    <div className={s.text}>
                        <div className={s.title}>{t('Landing.Stages.Point1Title')}</div>
                        <div className={s.subTitle}>{t('Landing.Stages.Point1Subtitle')}</div>
                        <div className={s.subSubTitle}>{t('Landing.Stages.Point1Text')}</div>
                    </div>
                </div>
                <Lines/>
                <div className={s.stage}>
                    <Number>02</Number>
                    <div className={s.text}>
                        <div className={s.title}>{t('Landing.Stages.Point2Title')}</div>
                        <div className={s.subTitle}>{t('Landing.Stages.Point2Subtitle')}</div>
                        <div className={s.subSubTitle}>{t('Landing.Stages.Point2Text')}</div>
                    </div>
                </div>
                <Lines/>
                <div className={s.stage}>
                    <Number>03</Number>
                    <div className={s.text}>
                        <div className={s.title}>{t('Landing.Stages.Point3Title')}</div>
                        <div className={s.subTitle}>{t('Landing.Stages.Point3Subtitle')}</div>
                        <div className={s.subSubTitle}>{t('Landing.Stages.Point3Text')}</div>
                    </div>
                </div>
            </div>
            <Prize/>
        </div>
    );
};

export default Stages;
