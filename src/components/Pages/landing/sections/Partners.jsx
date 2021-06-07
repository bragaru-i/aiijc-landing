import {h} from 'preact'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'
import Heading from '../components/Heading'



import s from './Partners.module.scss'

const Partners = ({rowClass}) => {
    const {t, i18n} = useTranslation();
    const lang = i18n.language;

    return (
        <section className={s['partners']}>
            <div className={rowClass}>
                <Heading text={t('Landing.Partners.Header')} />
            </div>

            < div className={cn(rowClass, s['partners-logos'])}>
                <a target="_blank" href={`https://www.sberbank.ru/en/individualclients`} className={cn(s["partners-logo"])}  >
                    <img src={lang === "ru" ? "/static/dist/aiijc/images/logos/logo-sber.png" : "/static/dist/aiijc/images/logos/logo-sber-en.png"} />
                </a>
                <a target="_blank" href={"https://cups.mail.ru/" + lang} className={s["partners-logo"]} >
                    <img src={lang === "ru" ? "/static/dist/aiijc/images/logos/logo-alliance.png" : "/static/dist/aiijc/images/logos/logo-alliance-en.png"} />
                </a>
            </div>

        </section>
    )
}

export default Partners
