import {h} from 'preact';
import {Link} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import cn from 'classnames';

import s from './Footer.module.scss';

const Footer = ({className}) => {
    const {t} = useTranslation();
    return (
        <footer className={s.footer}>
            <div className={cn(s.container, className)}>
                <div className={cn(s.block, s.first)}>
                    <div>
                        <h3 className={s.header}>{t('Landing.Footer.Header')}</h3>
                        <div className={s.subHeader}>{t('Landing.Footer.Subheader')} <a className={s.email} href="mailto:support@aiijc.com">support@aiijc.com</a></div>
                        {/* Filter for Russian subdetails of header */}
                        {t('Landing.Footer.Details').length > 0 &&
                            (<div className={s.subHeaderDetails}>{t('Landing.Footer.Details')}</div>)}
                    </div>

                    <div className={s.links}>
                        <Link to="/faq/legal/" className={s.rules}>
                            <svg className={s.rulesLogo} width="24" height="24" viewBox="0 0 24 24" fill="#fff"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" fill="#fff" />
                            </svg>
                            {t('Landing.Footer.Rules')}
                        </Link>
                        <Link to="/faq">{t('Landing.Footer.FaqLink')}</Link>
                    </div>
                </div>

                <div className={cn(s.block, s.second)}>
                    <div className={s.copyright}>
                        <div>{t('Landing.Footer.Copyright')}</div>
                        <div>{t('Landing.Footer.CopyrightExtra')}</div>
                    </div>

                </div>
            </div>
            <div className={s.cups}>
                <div className={s.support}>
                    {t('Landing.Footer.MadeBy')}
                </div>
                <a href="https://cups.mail.ru/">
                    <img src="/static/dist/aiijc/images//logos/logo-cups-white.png" width="115" height="34" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
