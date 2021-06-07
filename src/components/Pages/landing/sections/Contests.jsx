import {h} from 'preact'
import cn from 'classnames';
import {useTranslation} from 'react-i18next'

import Heading from '../components/Heading'

import s from './Contests.module.scss'

const Contests = ({rowClass}) => {
    const {t} = useTranslation()
    
    return (
        <section className={cn(rowClass, s.contest)}>
            <Heading text={t('Landing.Stages.Header')} />

            <div className={s["contest-boxes"]}>
                <div className={s["contest-box"]}>
                    <div className={s["contest-box__no"]}> <span>01</span></div>
                    <div className={s["contest-box__details"]}>
                        <div className={s["contest-box__details_title"]}> {t('Landing.Stages.Point1Subtitle')}</div>
                        <div className={s["contest-box__details_message"]}> {t('Landing.Stages.Point1Text')}</div>
                        <div className={s["contest-box__details_date"]}>{t('Landing.Stages.Point1Title')} </div>
                    </div>
                </div>
                <div className={s["contest-box"]}>
                    <div className={s["contest-box__no"]}> <span>02</span></div>
                    <div className={s["contest-box__details"]}>
                        <div className={s["contest-box__details_title"]}> {t('Landing.Stages.Point2Subtitle')}</div>
                        <div className={s["contest-box__details_message"]}> {t('Landing.Stages.Point2Text')}</div>
                        <div className={s["contest-box__details_date"]}>{t('Landing.Stages.Point2Title')} </div>
                    </div>
                </div>
                <div className={s["contest-box"]}>
                    <div className={s["contest-box__no"]}> <span>03</span></div>
                    <div className={s["contest-box__details"]}>
                    <div className={s["contest-box__details_title"]}> {t('Landing.Stages.Point3Subtitle')}</div>
                        <div className={s["contest-box__details_message"]}> {t('Landing.Stages.Point3Text')}</div>
                        <div className={s["contest-box__details_date"]}>{t('Landing.Stages.Point3Title')} </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contests
