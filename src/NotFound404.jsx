import {h, Fragment} from 'preact';
import {Link} from 'react-router-dom';
import Header from './components/Pages/main/sections/Header';
import Footer from './components/Pages/main/sections/Footer';
import {useTranslation} from "react-i18next";
import './NotFound404.scss'

const NotFound404 = () => {
    const {t} = useTranslation();

    return (
        <>
            <Header/>
            <div className="not-found">
                <div className="not-found-subtitle">{t('Page404.subTitle')}</div>
                <div className="not-found-title"><span>4</span><span>0</span><span>4</span></div>
                <div className="not-found-link">
                    <Link className="back-btn" to="/">{t('Page404.back')}</Link>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default NotFound404;
