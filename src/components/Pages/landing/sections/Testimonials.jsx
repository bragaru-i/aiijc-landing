import {h} from 'preact'
import cn from 'classnames'

import Heading from '../components/Heading'


import {useTranslation} from 'react-i18next'

import s from './Testimonials.module.scss'

const Testimonials = ({rowClass}) => {

    const {t, i18n} = useTranslation();
    const lang = i18n.language;
    return (
        <section className={s.testimonials} >


            <div className={cn(rowClass, s["testimonials-info"], s[`testimonials-info--${lang}`])}>
                <Heading text={t('Landing.Audience.Header')} />
                <div className={cn(s["testimonials-info-box-items"], s[`testimonials-info-box-items--${lang}`])}>
                    <div className={s["testimonials-info-box"]}>
                        <div className={s["testimonials-info-box__title"]} dangerouslySetInnerHTML={{__html: t('Landing.Audience.Card1Title')}} />
                        <div className={s["testimonials-info-box__msg"]}>
                            {t('Landing.Audience.Card1Subtitle')}
                        </div>
                        <div className={s["testimonials-info-box__img"]} >
                            <img src="/static/dist/aiijc/images/landing/landing-testim-box-1.png" />
                        </div>
                    </div>
                    <div className={s["testimonials-info-box"]}>
                        <div className={s["testimonials-info-box__title"]} dangerouslySetInnerHTML={{__html: t('Landing.Audience.Card2Title')}}>
                        </div>
                        <div className={s["testimonials-info-box__msg"]}>
                            {t('Landing.Audience.Card2Subtitle')}
                        </div>
                        <div className={s["testimonials-info-box__img"]} >
                            <img src="/static/dist/aiijc/images/landing/landing-testim-box-2.png" />
                        </div>
                    </div>
                    <div className={s["testimonials-info-box"]}>
                        <div className={s["testimonials-info-box__title"]} dangerouslySetInnerHTML={{__html: t('Landing.Audience.Card3Title')}} />

                        <div className={s["testimonials-info-box__msg"]}>
                            {t('Landing.Audience.Card3Subtitle')}
                        </div>
                        <div className={s["testimonials-info-box__img"]} >
                            <img src="/static/dist/aiijc/images/landing/landing-testim-box-3.png" />
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Testimonials
