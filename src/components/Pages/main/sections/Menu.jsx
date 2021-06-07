import {h} from 'preact';
import {connect} from 'redux-zero/preact';
import {useTranslation} from 'react-i18next';
import {Link, withRouter} from "react-router-dom";
import cn from 'classnames';
import actions from '../../../../store/actions';
import s from './Menu.module.scss';


const Menu = ({location, setIsTeamsMenuOpened}) => {
    const {t} = useTranslation();
    const lang = localStorage.getItem("langId") || 0;

    const links = [
        {text: t('Header.nav.tasks'), href: '/', alias: '/task'},
        {text: t("Header.nav.learning"), href: `/learning/language/${lang}?content_format=all`, alias: "/learning"},
        {text: t("Header.nav.webinar"), href: "/webinar/nearest", alias: "/webinar"},
        {text: "FAQ", href: "/faq"},
        {text: t("Header.nav.about"), href: "/about", className: s.about},
    ];

    const checkIsActive = (linkHref, linkAlias) => {
        if (linkAlias) {
            return linkAlias === location.pathname.substr(0, linkAlias.length) || location.pathname === linkHref;
        }
        return linkHref === location.pathname.substr(0, linkHref.length);
    };

    return (
        <nav className={cn("menu", s.menu)}>
            <ul>
                <li className={s.teamsLinkMobile}>
                    <Link className={cn({active: checkIsActive('/teams/', '/teams/')})}
                          onClick={() => setIsTeamsMenuOpened(true)}>
                        {t("teams.my")}
                    </Link>
                </li>

                {links.map(link => (
                    <li className={link.className}>
                        <Link to={link.href} className={cn({active: checkIsActive(link.href, link.alias)})}>
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className={s.separator}/>

            <ul className={s.rightList}>
                <li>
                    <Link to="/teams/" className={cn(s.teamsLink, {active: checkIsActive("/teams/", "/teams/")})}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.0001 9.16699C11.1052 9.16699 12.165 9.60598 12.9464 10.3874C13.7278 11.1688 14.1668 12.2286 14.1667 13.3337V18.3337H5.83342V13.3337C5.83342 12.2286 6.2724 11.1688 7.0538 10.3874C7.83521 9.60598 8.89501 9.16699 10.0001 9.16699ZM4.40675 11.672C4.27413 12.1193 4.19579 12.581 4.17342 13.047L4.16675 13.3337V18.3337H1.66675V14.5837C1.66658 13.865 1.93177 13.1715 2.41144 12.6363C2.89112 12.1011 3.5515 11.7619 4.26592 11.6837L4.40758 11.672H4.40675ZM15.5934 11.672C16.335 11.7172 17.0314 12.0436 17.5406 12.5847C18.0497 13.1258 18.3333 13.8407 18.3334 14.5837V18.3337H15.8334V13.3337C15.8334 12.7562 15.7501 12.1987 15.5934 11.672ZM4.58342 6.66699C5.13595 6.66699 5.66585 6.88649 6.05655 7.27719C6.44726 7.66789 6.66675 8.19779 6.66675 8.75033C6.66675 9.30286 6.44726 9.83276 6.05655 10.2235C5.66585 10.6142 5.13595 10.8337 4.58342 10.8337C4.03088 10.8337 3.50098 10.6142 3.11028 10.2235C2.71958 9.83276 2.50008 9.30286 2.50008 8.75033C2.50008 8.19779 2.71958 7.66789 3.11028 7.27719C3.50098 6.88649 4.03088 6.66699 4.58342 6.66699ZM15.4168 6.66699C15.9693 6.66699 16.4992 6.88649 16.8899 7.27719C17.2806 7.66789 17.5001 8.19779 17.5001 8.75033C17.5001 9.30286 17.2806 9.83276 16.8899 10.2235C16.4992 10.6142 15.9693 10.8337 15.4168 10.8337C14.8642 10.8337 14.3343 10.6142 13.9436 10.2235C13.5529 9.83276 13.3334 9.30286 13.3334 8.75033C13.3334 8.19779 13.5529 7.66789 13.9436 7.27719C14.3343 6.88649 14.8642 6.66699 15.4168 6.66699ZM10.0001 1.66699C10.8841 1.66699 11.732 2.01818 12.3571 2.6433C12.9822 3.26842 13.3334 4.11627 13.3334 5.00033C13.3334 5.88438 12.9822 6.73223 12.3571 7.35735C11.732 7.98247 10.8841 8.33366 10.0001 8.33366C9.11603 8.33366 8.26818 7.98247 7.64306 7.35735C7.01794 6.73223 6.66675 5.88438 6.66675 5.00033C6.66675 4.11627 7.01794 3.26842 7.64306 2.6433C8.26818 2.01818 9.11603 1.66699 10.0001 1.66699Z"
                                fill="white"/>
                        </svg>
                        {t("teams.my")}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

const mapToProps = ({}) => ({});
export default withRouter(connect(mapToProps, actions)(Menu));
