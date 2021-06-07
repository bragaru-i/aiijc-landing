import {h} from 'preact';
import {Link} from "react-router-dom";
import s from './style.module.css';
import {useTranslation} from 'react-i18next';
import cn from 'classnames';


const Footer = () => {
    const {t} = useTranslation();
    return (
        <div className={s.footer}>
            <div className={s.container}>
                <div className={cn(s.block, s.first)}>
                    <div>
                        <h3 className={s.header}>{t('Landing.Footer.Header')}</h3>
                        <div className={s.subHeader}>{t('Landing.Footer.Subheader')} <a className={s.email} href="mailto:support@aiijc.com">support@aiijc.com</a></div>
                    </div>

                    <div className={s.links}>
                        <Link to="/faq/legal/" className={s.rules}>
                            <svg className={s.rulesLogo} width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" fill="black"/>
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

                    <div className={s.cups}>
                        <div className={s.support}>
                            {t('Landing.Footer.MadeBy')}
                        </div>
                        <a href="https://cups.mail.ru/">
                            <img src="/static/dist/aiijc/images/logoAllCups.svg" width="115" height="34" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
