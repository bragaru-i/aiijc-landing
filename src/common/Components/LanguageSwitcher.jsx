import {h, Fragment} from 'preact';
import {useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import classnames from 'classnames';
import {LANGUAGE_COOKIE_NAME, ENABLE_LOCALES} from '../../i18n';
import Cookies from 'js-cookie';
import './LanguageSwitcher.scss';

const LanguageSwitcher = ({className = ''}) => {
    const {i18n} = useTranslation();
    const location = useLocation();

    const switchLang = (lang) => {
        Cookies.set(LANGUAGE_COOKIE_NAME, lang);
        window.location.replace(
          `/${lang}${location.pathname}${location.search}${location.hash}`
        );
    };

    return (
        <>
            {ENABLE_LOCALES && (
                <ul class={classnames('LanguageSwitcher', 'list-no-style', className)}>
                    <li className={classnames({active: i18n.language === 'ru'})} onClick={() => {
                        switchLang('ru');
                    }}>Rus</li>
                    <li className={classnames({active: i18n.language === 'en'})}
                        onClick={() => {
                            switchLang('en');
                        }}>Eng</li>
                </ul>
            )}
        </>
    );
};

export default LanguageSwitcher;
