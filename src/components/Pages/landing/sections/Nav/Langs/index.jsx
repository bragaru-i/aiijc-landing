import {h} from 'preact';
import {useCallback} from 'preact/hooks';
import {connect} from "redux-zero/preact";
import actions from "../../../../../../store/actions";
import cn from 'classnames';
import s from './style.module.scss';
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import {LANGUAGE_COOKIE_NAME} from "../../../../../../i18n";


const Langs = ({color = ""}) => {
    const {i18n} = useTranslation();
    const location = useLocation();

    const switchLang = useCallback(({target}) => {
        const {lang} = target.dataset;
        Cookies.set(LANGUAGE_COOKIE_NAME, lang);
        window.location.replace(
            `/${lang}${location.pathname}${location.search}${location.hash}`
        );
    }, []);

    return (
        <div className={cn(s.langs, {[s.black]: color = "black"})}>
            <button type="button" className={cn({[s.activeLang]: i18n.language === 'ru'}, s.lang)}
                data-lang="ru" onClick={switchLang}>
                {color === "black" ? "Rus" : "РУС"}
            </button>
            <button type="button" className={cn({[s.activeLang]: i18n.language === 'en'}, s.lang)}
                data-lang="en" onClick={switchLang}>
                {color === "black" ? "Eng" : "ENG"}
            </button>
        </div>
    );
};

const mapToProps = ({ }) => ({});

export default connect(mapToProps, actions)(Langs);
