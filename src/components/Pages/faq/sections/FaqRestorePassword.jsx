import { h, Fragment } from 'preact';
import {useTranslation} from 'react-i18next';
import {FaqList} from './';
import Helmet from "preact-helmet";
import {Link} from "react-router-dom";

export const FaqRestorePassword = () => {
    const {t} = useTranslation();
    const items = [
        {
            answer_title: t('FAQ.list.restorePassword'),
            linkTo: '/faq/restore-password/restore',
            slug: 'restore-password/restore',
            icon: '<svg width="68" height="30" viewBox="0 0 68 30" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M1 29L0.999999 1L67 1L67 29L1 29Z" stroke="black" stroke-width="2"/>' +
                '<rect x="11.9648" y="9" width="2" height="8" fill="#1E1EF7"/>' +
                '<rect x="9" y="11.8652" width="2" height="8" transform="rotate(-60 9 11.8652)" fill="#1E1EF7"/>' +
                '<rect x="10" y="15.8652" width="2" height="8" transform="rotate(-120 10 15.8652)" fill="#1E1EF7"/>' +
                '<rect x="25.8945" y="9" width="2" height="8" fill="#1E1EF7"/>' +
                '<rect x="22.9297" y="11.8652" width="2" height="8" transform="rotate(-60 22.9297 11.8652)" fill="#1E1EF7"/>' +
                '<rect x="23.9297" y="15.8652" width="2" height="8" transform="rotate(-120 23.9297 15.8652)" fill="#1E1EF7"/>' +
                '<rect x="39.8203" y="9" width="2" height="8" fill="#1E1EF7"/>' +
                '<rect x="36.8555" y="11.8652" width="2" height="8" transform="rotate(-60 36.8555 11.8652)" fill="#1E1EF7"/>' +
                '<rect x="37.8555" y="15.8652" width="2" height="8" transform="rotate(-120 37.8555 15.8652)" fill="#1E1EF7"/>' +
                '<rect x="51" y="22" width="2" height="8" transform="rotate(-90 51 22)" fill="black"/>' +
                '<rect x="37" y="22" width="2" height="8" transform="rotate(-90 37 22)" fill="black"/>' +
                '<rect x="23" y="22" width="2" height="8" transform="rotate(-90 23 22)" fill="black"/>' +
                '<rect x="9" y="22" width="2" height="8" transform="rotate(-90 9 22)" fill="black"/>' +
                '</svg>'
        }, {
            answer_title: t('FAQ.list.activateAccount'),
            linkTo: '/faq/restore-password/activate',
            slug: 'restore-password/activate',
            icon: '<svg width="36" height="30" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path fill-rule="evenodd" clip-rule="evenodd" d="M0.457031 5.8393L1.54353 4.16016L18.0003 14.8086L34.457 4.16016L35.5435 5.8393L18.0003 17.1908L0.457031 5.8393Z" fill="#1E1EF7"/>' +
                '<path fill-rule="evenodd" clip-rule="evenodd" d="M34 2H2V28H34V2ZM0 0V30H36V0H0Z" fill="black"/>' +
                '</svg>'
        }
    ];
    return (
        <>
            <Helmet title={t('Helmet.RestoreAccess')}/>
            <Link to="/faq" className="back-btn">
                {t('buttons.back')}
            </Link>
            <h1>{t('FAQ.restoreActivateTitle')}</h1>
            <FaqList items={items} />
        </>
    );
};

