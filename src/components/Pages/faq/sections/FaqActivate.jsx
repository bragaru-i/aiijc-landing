import { h, Fragment } from 'preact';
import {FaqActivateDialog} from './';
import {useTranslation} from 'react-i18next';
import Helmet from "preact-helmet";
import {Link} from "react-router-dom";

export const FaqActivate = () => {
    const {t} = useTranslation();
    return (
        <>
            <Helmet title={t('Helmet.ActivateAccount')}/>
            <Link to="/faq/restore-password" className="back-btn">
                {t('buttons.back')}
            </Link>
            <h1>{t('FAQ.restoreActivateTitle')}</h1>
            <FaqActivateDialog />
        </>
    );
};
