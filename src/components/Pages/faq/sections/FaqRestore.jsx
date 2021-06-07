import { h, Fragment } from 'preact';
import FaqRestoreDialog from './Components/FaqRestoreDialog';
import {useTranslation} from 'react-i18next';
import Helmet from "preact-helmet";
import {Link} from "react-router-dom";

export const FaqRestore = () => {
    const {t} = useTranslation();
    return (
        <>
            <Helmet title={t('Helmet.RestoreTitle')}/>
            <Link to="/faq/restore-password" className="back-btn">
                {t('buttons.back')}
            </Link>
            <h1>{t('FAQ.restoreActivateTitle')}</h1>
            <FaqRestoreDialog />
        </>
    );
};
