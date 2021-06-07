import {h, Fragment} from 'preact';
import {connect} from "redux-zero/preact";
import {Link} from 'react-router-dom';
import actions from "../../../../store/actions";
import {api, pushAnalytics} from '../../../../common';
import {useCallback, useState} from 'preact/hooks';
import Modal from '../../../../common/Modal';
import LoginForm from '../../../Profile/LoginForm';
import LanguageSwitcher from '../../../../common/Components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import './Header.scss';
import Menu from './Menu';
import {TRACKER_GOALS} from "../../../../constants";
import HorizontalRow from "./HorizontalRow";
import TeamsMobileMenu from '../../../Pages/teams/components/MobileMenu';


const Header = ({isMainPage, user, showModal, logout, className, color = "", screen}) => {
    const [isBurgerOpened, setIsBurgerOpened] = useState(false);
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [isTeamsMenuOpened, setIsTeamsMenuOpened] = useState(false);
    const isTablet = screen && screen.width <= 1200;

    const userLogout = async () => {
        setIsLoading(true);
        logout();
        try {
            const res = await api.post('/api_v2/logout/', {});
        } catch (e) {

        } finally {
            setIsLoading(false);
        }
    }

    const showSignup = useCallback(() => {
        showModal('signup');
        pushAnalytics(TRACKER_GOALS.OPEN_SIGNUP_MODAL);
    }, [showModal]);

    const showLogin = useCallback(() => {
        showModal('login');
        pushAnalytics(TRACKER_GOALS.OPEN_LOGIN_MODAL);
    }, [showModal]);

    return (
        <>
            <header class={cn("header", {mainPage: isMainPage}, {loggined: user, burgerOpened: isBurgerOpened}, className, {"header--black": color === "black"})}>
                <div className="container">
                    <div class="logo">
                        <Link to="/">
                            <img src="/static/dist/aiijc/images/logo.svg" />
                        </Link>
                    </div>
                    <div class={cn('lang')}>
                        <LanguageSwitcher />
                    </div>
                    {user && (
                        <>
                            {isTeamsMenuOpened && isBurgerOpened && isTablet ?
                                <TeamsMobileMenu setIsBurgerOpened={setIsBurgerOpened} setIsTeamsMenuOpened={setIsTeamsMenuOpened}/> :
                                <Menu setIsTeamsMenuOpened={setIsTeamsMenuOpened}/>
                            }
                        </>
                    )}
                    {!isTeamsMenuOpened && (
                        <div className={cn('profile', {loggined: user})}>
                            {!user && <>
                                <button type="button" className="btn primary"
                                        onClick={showSignup}>{t('buttons.Participate')}</button>
                                <button type="button" className="btn login-btn"
                                        onClick={showLogin}>{t('buttons.LogIn')}</button>
                                <button type="button" className="btn login-btn login-btn-mobile"
                                        onClick={showLogin}></button>
                            </>}
                            {user && <>
                                <div className="user">
                                    <div className="avatar">
                                        {user?.cropping && <img src={user.cropping} />}
                                        {!user?.cropping &&  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                              xmlns="http://www.w3.org/2000/svg">
                                            <rect width="40" height="40" rx="5" fill="#E6EAF5"/>
                                            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="1" y="1"
                                                  width="38" height="38">
                                                <rect x="1" y="1" width="38" height="38" rx="5" fill="#E6EAF5"/>
                                            </mask>
                                            <g mask="url(#mask0)">
                                                <path
                                                    d="M13.8591 35.4804L7.66247 38.8845C7.29884 39.0842 6.66797 39.5972 6.66797 39.5972C6.66797 39.5972 14.9445 39.6667 20.0401 39.6667C25.098 39.6667 33.3346 39.6667 33.3346 39.6667C33.3346 39.6667 32.6418 39.13 32.2422 38.9295L25.6067 35.5886C24.7493 35.1568 24.2078 34.2744 24.2078 33.3092V30.6873C24.3943 30.4734 24.6074 30.1987 24.8355 29.8743C25.7399 28.5878 26.424 27.1727 26.8982 25.6881C27.7493 25.4237 28.3762 24.6321 28.3762 23.6913V20.8926C28.3762 20.2769 28.1043 19.7268 27.6819 19.3417V15.2959C27.6819 15.2959 28.5071 9 20.0409 9C11.5747 9 12.3999 15.2959 12.3999 15.2959V19.3417C11.9767 19.7268 11.7055 20.2769 11.7055 20.8926V23.6913C11.7055 24.4284 12.0903 25.0772 12.6663 25.4521C13.3607 28.4963 15.1789 30.6873 15.1789 30.6873V33.2445C15.1781 34.1758 14.6718 35.0337 13.8591 35.4804Z"
                                                    fill="black"/>
                                            </g>
                                        </svg>}
                                    </div>
                                    <div className="user-info">
                                        <div className="user-login">
                                            {user.login}
                                        </div>
                                        <div className="user-buttons">
                                            <Link to="/profile">{t("Profile.my")}</Link>
                                            <button type="button" className="btn user-logout-btn"
                                                    onClick={() => userLogout()}
                                                    disabled={isLoading}>
                                                <svg width="20" height="20" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.5 17.5H4.167A1.667 1.667 0 012.5 15.833V4.167A1.667 1.667 0 014.167 2.5H7.5M14.167 13.333L17.5 10l-3.333-3.333M17.5 10h-10"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>}
                        </div>
                    )}
                    <div className="burger" onClick={() => setIsBurgerOpened(!isBurgerOpened)}></div>
                </div>
                {isMainPage && user && <HorizontalRow />}
            </header>
        </>
    )
}

const mapToProps = ({user, screen}) => ({user, screen});
export default connect(mapToProps, actions)(Header);
