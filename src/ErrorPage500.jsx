import {h, Fragment} from 'preact';
import {Link} from 'react-router-dom';
import Header from './components/Pages/main/sections/Header';
import Footer from './components/Pages/main/sections/Footer';
import {useTranslation} from "react-i18next";
import './NotFound404.scss'

const ErrorPage500 = () => {
    const {t} = useTranslation();

    return (
        <>
            <Header/>
            <div className="not-found">
                <div className="not-found-subtitle">Internal Server Error</div>
                <div className="not-found-title"><span>5</span><span>0</span><span>0</span></div>
                <div className="not-found-link">
                    <Link className="back-btn" to="/">{t('Page404.back')}</Link>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ErrorPage500;
