import {h} from 'preact';
import {Link} from "react-router-dom";
import {Trans, useTranslation} from 'react-i18next';
import './Footer.scss';

const Footer = () => {
    const {t} = useTranslation();
    return (
        <footer class="footer">
            <div class="container">
                <div className="left">
                    <h4>{t('Footer.questionsH4')}</h4>
                    <div className="support"><span>{t('Footer.questions')} <a
                        href="mailto:support@aiijc.com">support@aiijc.com</a></span></div>
                    <div class="copyright">
                        <span dangerouslySetInnerHTML={{__html: t('Footer.copyright')}}></span>
                    </div>
                </div>
                <div className="right">
                    <Link to="/faq" className="footer-faq-link">FAQ</Link>
                    <ul className="links list-no-style">
                        <li>
                            <Link to="/faq/legal/">
                                <svg width="12" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7l4 4 4-4M6 1v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect y="14" width="12" height="2" rx="1" fill="currentColor"/></svg>
                                <span dangerouslySetInnerHTML={{__html: t('Footer.download')}}></span>
                            </Link>
                        </li>
                    </ul>
                    <div className="all-cups">
                        <a href="https://cups.mail.ru/" target="_blank" rel="noopener noreferrer">
                            {t('Footer.support')}
                            <img src="/static/dist/aiijc/images/logoAllCups.svg"/>
                        </a>
                    </div>
                </div>

                <div className="mobile">
                    <h4>{t('Footer.questionsH4')}</h4>
                    <div className="support"><span>{t('Footer.questions')} <a
                        href="mailto:support@aiijc.com">support@aiijc.com</a></span></div>
                    <div className="linksWrapper">
                        <Link className="link" to="/faq/legal/">
                            <svg width="12" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7l4 4 4-4M6 1v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect y="14" width="12" height="2" rx="1" fill="currentColor"/></svg>
                            <span dangerouslySetInnerHTML={{__html: t('Footer.download')}}></span>
                        </Link>
                        <Link to="/faq" className="footer-faq-link">FAQ</Link>
                    </div>
                    <div className="copyright">
                        <span dangerouslySetInnerHTML={{__html: t('Footer.copyright')}}></span>
                    </div>
                    <div className="all-cups">
                        <a href="https://cups.mail.ru/" target="_blank" rel="noopener noreferrer">
                            {t('Footer.support')}
                            <img src="/static/dist/aiijc/images/logoAllCups.svg"/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;