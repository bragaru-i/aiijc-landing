import {h} from 'preact';
import Header from '../Header';
import Sber from './logos/Sber';
import Alliance from './logos/Alliance';
import SberEn from './logos/SberEn';
import AllianceEn from './logos/AllianceEn';
import Mail from './logos/Mail';
import Partner from "./Partner";
import s from './style.module.css';
import {useTranslation} from 'react-i18next';


const Partners = () => {
    const {t, i18n} = useTranslation();
    const lang = i18n.language;
    return (
        <div className={s.container}>
            <Header topLeftCornerGreen>{t('Landing.Partners.Header')}</Header>

            <svg className={s.lines} width="898" height="170" viewBox="0 0 898 170" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M36 4V4C36 39.8985 65.1015 69 101 69H801C852.363 69 894 110.638 894 162V162" stroke="black"
                      stroke-width="2"/>
                <path d="M20 4V4C20 48.7351 56.2649 85 101 85H407C451.735 85 488 121.265 488 166V166" stroke="black"
                      stroke-width="2"/>
                <path d="M4 4V8.09953C4 35.7521 16.9538 61.8079 39 78.5V78.5C61.0462 95.1921 74 121.248 74 148.9V166"
                      stroke="black" stroke-width="2"/>
                <circle cx="4" cy="4" r="4" fill="black"/>
                <circle cx="20" cy="4" r="4" fill="black"/>
                <circle cx="36" cy="4" r="4" fill="black"/>
                <circle cx="74" cy="166" r="4" fill="black"/>
                <circle cx="488" cy="166" r="4" fill="black"/>
                <circle cx="894" cy="166" r="4" fill="black"/>
            </svg>

            <div className={s.partners}>
                <Partner href={`https://www.sberbank.ru/en/individualclients`}>
                    {lang === 'ru'? <Sber className={s.logo}/> : <SberEn className={s.logo}/> }
                </Partner>
                <Partner href="https://a-ai.ru/">
                    {lang === 'ru'? <Alliance className={s.logo}/> : <AllianceEn className={s.logo}/> }
                </Partner>
                <Partner href={`https://cups.mail.ru/${lang === 'ru' ? 'ru' : 'en'}/`}>
                    <Mail className={s.logo}/>
                </Partner>
            </div>
        </div>
    );
};

export default Partners;
