import {h, Fragment} from 'preact';
import {Link} from 'react-router-dom';
import {useCallback, useState} from "preact/hooks";
import {connect} from "redux-zero/preact";
import actions from "../../../../../store/actions";
import LoginForm from "../../../../Profile/LoginForm";
import Modal from "../../../../../common/Modal";
import Langs from "./Langs";
import Button from "../../components/Button";
import s from './style.module.scss';
import {useTranslation} from 'react-i18next';
import cn from 'classnames'
import {pushAnalytics} from '../../../../../common';
import {TRACKER_GOALS} from '../../../../../constants';


const Nav = ({showModal, user, color = ""}) => {
    const [isAuthModalShowing, setIsAuthModalShowing] = useState(false);
    const {t} = useTranslation();

    const showSignup = useCallback(() => {
        showModal('signup');
        pushAnalytics(TRACKER_GOALS.OPEN_SIGNUP_MODAL);
    }, [showModal]);

    const showAuth = useCallback(() => {
        setIsAuthModalShowing(true);
        pushAnalytics(TRACKER_GOALS.OPEN_LOGIN_MODAL);
    }, [showModal]);

    return (
        <div className={s.wrapper}>
            <div className={cn( {[s.containerBlack]: color === "black"})}>
                <Link to="/" className={s.logo}>
                    <img className={s.logoGreenPart} src="/static/dist/aiijc/images/logos/aiijc-logo-sm.png" />
                </Link>
                <div className="spacer"/>
                <div className={s.right}>
                    <Langs color={color} />

                    {!user && (
                        <Button  className={s["hide-on-mobile"]} onClick={showSignup}>{t('Landing.Nav.Button')}</Button>
                    )}

                    <button className={s.login} onClick={showAuth}>
                        <span className={s.loginText}>{t('Landing.Nav.AuthButton')}</span>
                        <svg className={s.loginIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1031 13.5998C14.257 13.5998 16.0031 11.8537 16.0031 9.6998C16.0031 7.54589 14.257 5.7998 12.1031 5.7998C9.94921 5.7998 8.20312 7.54589 8.20312 9.6998C8.20312 11.8537 9.94921 13.5998 12.1031 13.5998Z" stroke="white" stroke-miterlimit="10" />
                            <path d="M17.5031 21.8004C17.5031 18.8004 15.1031 16.4004 12.1031 16.4004C9.10312 16.4004 6.70312 18.8004 6.70312 21.8004" stroke="white" stroke-miterlimit="10" />
                            <path d="M12.1 23.2C18.2304 23.2 23.2 18.2304 23.2 12.1C23.2 5.96964 18.2304 1 12.1 1C5.96964 1 1 5.96964 1 12.1C1 18.2304 5.96964 23.2 12.1 23.2Z" stroke="white" stroke-miterlimit="10" />


                        </svg>
                    </button>
                </div>
            </div>

            <Modal
                isShowing={isAuthModalShowing}
                header={t('Landing.Nav.ModalHeader')}
                children={<LoginForm setIsAuthModalShowing={setIsAuthModalShowing} />}
                onClose={(e) => {
                    setIsAuthModalShowing(false);
                }}
            />
        </div>
    );
};

const mapToProps = ({user}) => ({user});

export default connect(mapToProps, actions)(Nav);
