import {h, Fragment} from 'preact';
import Header from '../Header';
import s from './style.module.css';
import {useTranslation} from 'react-i18next';


const Audience = () => {
    const {t} = useTranslation();
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header bottomRightCornerGreen>{t('Landing.Audience.Header')}</Header>
                <svg className={s.topLines} width="910" height="165" viewBox="0 0 910 165" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M36 4V4C36 42.1076 66.8924 73 105 73H818C866.601 73 906 112.399 906 161V161" stroke="black"
                          stroke-width="2"/>
                    <path d="M20 4V4C20 50.9442 58.0558 89 105 89H416C455.765 89 488 121.235 488 161V161" stroke="black"
                          stroke-width="2"/>
                    <path d="M4 4V7.17811C4 35.5082 16.8779 62.3023 39 80V80C61.1221 97.6977 74 124.492 74 152.822V161"
                          stroke="black" stroke-width="2"/>
                    <circle cx="906" cy="161" r="4" fill="black"/>
                    <circle cx="488" cy="161" r="4" fill="black"/>
                    <circle cx="74" cy="161" r="4" fill="black"/>
                    <circle cx="4" cy="4" r="4" fill="black"/>
                    <circle cx="20" cy="4" r="4" fill="black"/>
                    <circle cx="36" cy="4" r="4" fill="black"/>
                </svg>

                <div className={s.cards}>
                    <div className={s.card}>
                        <div className={s.imageWrapper}>
                            <svg width="100" height="116" viewBox="0 0 100 116" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="48" cy="68" r="47" stroke="#72FF72" stroke-width="2"/>
                                <path
                                    d="M1.01257 43C1.54304 21.923 18.7952 5 40 5H94.9874C94.457 26.077 77.2048 43 56 43H1.01257Z"
                                    fill="white" stroke="#72FF72" stroke-width="2"/>
                                <circle cx="32" cy="68" r="11" fill="#72FF72" stroke="#72FF72" stroke-width="2"/>
                                <circle cx="64" cy="68" r="11" fill="#72FF72" stroke="#72FF72" stroke-width="2"/>
                                <path d="M53 68C53 65.2386 50.7614 63 48 63C45.2386 63 43 65.2386 43 68"
                                      stroke="#72FF72"
                                      stroke-width="2"/>
                                <path d="M52 88C52 90.2091 50.2091 92 48 92C45.7909 92 44 90.2091 44 88"
                                      stroke="#72FF72"
                                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="52" cy="64" r="47" stroke="black" stroke-width="2"/>
                                <path
                                    d="M5.01257 39C5.54304 17.923 22.7952 1 44 1H98.9874C98.457 22.077 81.2048 39 60 39H5.01257Z"
                                    fill="white" stroke="black" stroke-width="2"/>
                                <circle cx="36" cy="64" r="11" stroke="black" stroke-width="2"/>
                                <circle cx="68" cy="64" r="11" stroke="black" stroke-width="2"/>
                                <path d="M57 64C57 61.2386 54.7614 59 52 59C49.2386 59 47 61.2386 47 64" stroke="black"
                                      stroke-width="2"/>
                                <path d="M56 84C56 86.2091 54.2091 88 52 88C49.7909 88 48 86.2091 48 84" stroke="black"
                                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M79 59H82L83 61H80L79 59Z" fill="black"/>
                                <path d="M27 68H30L31 70H28L27 68Z" fill="black"/>
                                <path d="M76 59H79L80 61H77L76 59Z" fill="white"/>
                                <path d="M24 68H27L28 70H25L24 68Z" fill="#72FF72"/>
                            </svg>
                        </div>
                        <div className={s.title}>{t('Landing.Audience.Card1Title')}</div>
                        <div className={s.subTitle}>{t('Landing.Audience.Card1Subtitle')}</div>
                    </div>
                    <div className={s.card}>
                        <div className={s.imageWrapper}>
                            <svg width="180" height="100" viewBox="0 0 180 100" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="5" width="174" height="94" stroke="#72FF72" stroke-width="2"/>
                                <path
                                    d="M25.4 36.6L20.8 32L25.4 27.4L24 26L18 32L24 38L25.4 36.6ZM35.6 36.6L40.2 32L35.6 27.4L37 26L43 32L37 38L35.6 36.6Z"
                                    fill="#72FF72"/>
                                <path d="M32 26L29 38.5" stroke="#72FF72" stroke-width="2"/>
                                <path d="M16 60H64" stroke="#72FF72" stroke-width="2"/>
                                <path d="M16 68H64" stroke="#72FF72" stroke-width="2"/>
                                <path d="M16 76H64" stroke="#72FF72" stroke-width="2"/>
                                <circle cx="136" cy="44" r="23" fill="#72FF72" stroke="#72FF72" stroke-width="2"/>
                                <rect x="5" y="1" width="174" height="94" stroke="black" stroke-width="2"/>
                                <path
                                    d="M29.4 32.6L24.8 28L29.4 23.4L28 22L22 28L28 34L29.4 32.6ZM39.6 32.6L44.2 28L39.6 23.4L41 22L47 28L41 34L39.6 32.6Z"
                                    fill="black"/>
                                <path d="M36 22L33 34.5" stroke="black" stroke-width="2"/>
                                <path d="M20 56H68" stroke="black" stroke-width="2"/>
                                <path d="M20 64H68" stroke="black" stroke-width="2"/>
                                <path d="M20 72H68" stroke="black" stroke-width="2"/>
                                <circle cx="140" cy="40" r="23" stroke="black" stroke-width="2"/>
                            </svg>
                        </div>
                        <div className={s.title}>{t('Landing.Audience.Card2Title')}</div>
                        <div className={s.subTitle}>{t('Landing.Audience.Card2Subtitle')}</div>
                    </div>
                    <div className={s.card}>
                        <div className={s.imageWrapper}>
                            <svg width="108" height="108" viewBox="0 0 108 108" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="52" cy="56" r="51" stroke="#72FF72" stroke-width="2"/>
                                <path
                                    d="M74.4016 56C74.4016 70.2515 71.8001 83.1055 67.6359 92.3592C63.4295 101.707 57.8247 107 52.0016 107C46.1785 107 40.5736 101.707 36.3672 92.3592C32.203 83.1055 29.6016 70.2515 29.6016 56C29.6016 41.7485 32.203 28.8945 36.3672 19.6408C40.5736 10.2933 46.1785 5 52.0016 5C57.8247 5 63.4295 10.2933 67.6359 19.6408C71.8001 28.8945 74.4016 41.7485 74.4016 56Z"
                                    stroke="#72FF72" stroke-width="2"/>
                                <path
                                    d="M52 50C60.5982 50 68.6631 51.0033 75.6442 52.7567C83.0547 54.618 89.1973 57.3126 93.4629 60.5089C97.7395 63.7134 100 67.3145 100 71C100 76.4353 95.0443 81.6905 86.2386 85.6441C77.5276 89.5551 65.4233 92 52 92C38.5767 92 26.4724 89.5551 17.7614 85.6441C8.95566 81.6905 4 76.4353 4 71C4 67.3145 6.26048 63.7134 10.5371 60.5089C14.8026 57.3126 20.9452 54.618 28.3558 52.7567C35.3369 51.0033 43.4018 50 52 50Z"
                                    stroke="#72FF72" stroke-width="2"/>
                                <path
                                    d="M52 20C60.5982 20 68.6631 21.0033 75.6442 22.7567C83.0547 24.618 89.1973 27.3126 93.4629 30.5089C97.7395 33.7134 100 37.3145 100 41C100 46.4353 95.0443 51.6905 86.2386 55.6441C77.5276 59.5551 65.4233 62 52 62C38.5767 62 26.4724 59.5551 17.7614 55.6441C8.95566 51.6905 4 46.4353 4 41C4 37.3145 6.26048 33.7134 10.5371 30.5089C14.8026 27.3126 20.9452 24.618 28.3558 22.7567C35.3369 21.0033 43.4018 20 52 20Z"
                                    stroke="#72FF72" stroke-width="2"/>
                                <path
                                    d="M67 18.5C63 10.5 57.6667 6.5 55.5 5.5C53.8097 4.5 33.5 4 20 16C9.2 25.6 4.5 37 3.5 41.5C3.5 42 4.1 43.9 6.5 47.5C9.5 52 18 56 25.5 58.5C33 61 37 61 49 62C58.6 62.8 69.6667 60.6667 74 59.5V43C74 41 72 28.5 67 18.5Z"
                                    fill="#72FF72"/>
                                <circle cx="56" cy="52" r="51" stroke="black" stroke-width="2"/>
                                <path
                                    d="M78.4016 52C78.4016 66.2515 75.8001 79.1055 71.6359 88.3592C67.4295 97.7067 61.8247 103 56.0016 103C50.1785 103 44.5736 97.7067 40.3672 88.3592C36.203 79.1055 33.6016 66.2515 33.6016 52C33.6016 37.7485 36.203 24.8945 40.3672 15.6408C44.5736 6.29326 50.1785 1 56.0016 1C61.8247 1 67.4295 6.29326 71.6359 15.6408C75.8001 24.8945 78.4016 37.7485 78.4016 52Z"
                                    stroke="black" stroke-width="2"/>
                                <path
                                    d="M56 46C64.5982 46 72.6631 47.0033 79.6442 48.7567C87.0547 50.618 93.1973 53.3126 97.4629 56.5089C101.74 59.7134 104 63.3145 104 67C104 72.4353 99.0443 77.6905 90.2386 81.6441C81.5276 85.5551 69.4233 88 56 88C42.5767 88 30.4724 85.5551 21.7614 81.6441C12.9557 77.6905 8 72.4353 8 67C8 63.3145 10.2605 59.7134 14.5371 56.5089C18.8026 53.3126 24.9452 50.618 32.3558 48.7567C39.3369 47.0033 47.4018 46 56 46Z"
                                    stroke="black" stroke-width="2"/>
                                <path
                                    d="M56 16C64.5982 16 72.6631 17.0033 79.6442 18.7567C87.0547 20.618 93.1973 23.3126 97.4629 26.5089C101.74 29.7134 104 33.3145 104 37C104 42.4353 99.0443 47.6905 90.2386 51.6441C81.5276 55.5551 69.4233 58 56 58C42.5767 58 30.4724 55.5551 21.7614 51.6441C12.9557 47.6905 8 42.4353 8 37C8 33.3145 10.2605 29.7134 14.5371 26.5089C18.8026 23.3126 24.9452 20.618 32.3558 18.7567C39.3369 17.0033 47.4018 16 56 16Z"
                                    stroke="black" stroke-width="2"/>
                            </svg>
                        </div>
                        <div className={s.title}>{t('Landing.Audience.Card3Title')}</div>
                        <div className={s.subTitle}>{t('Landing.Audience.Card3Subtitle')}</div>
                    </div>
                </div>

                <svg className={s.bottomLines} width="908" height="165" viewBox="0 0 908 165" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M36 161V161C36 129.52 61.5198 104 93 104H804C859.228 104 904 59.2285 904 4V4"
                          stroke="black" stroke-width="2"/>
                    <path d="M20 161V161C20 120.683 52.6832 88 93 88H404C450.392 88 488 50.3919 488 4V4" stroke="black"
                          stroke-width="2"/>
                    <path
                        d="M4 161V161C4 135.673 15.3263 111.672 34.8772 95.5717L38 93C59.5282 75.2709 72 48.8434 72 20.9546V4"
                        stroke="black" stroke-width="2"/>
                    <circle cx="4" cy="161" r="4" fill="black"/>
                    <circle cx="20" cy="161" r="4" fill="black"/>
                    <circle cx="904" cy="4" r="4" fill="black"/>
                    <circle cx="488" cy="4" r="4" fill="black"/>
                    <circle cx="72" cy="4" r="4" fill="black"/>
                    <circle cx="36" cy="161" r="4" fill="black"/>
                </svg>
            </div>
        </div>
    );
};

export default Audience;
