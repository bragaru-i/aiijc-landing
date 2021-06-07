import {h, Fragment} from 'preact';
import Button from "../../Button";
import s from './style.module.css';
import {Link} from "react-router-dom";
import {useCallback} from "preact/hooks";
import {connect} from "redux-zero/preact";
import actions from "../../../../../store/actions";
import {useTranslation} from 'react-i18next';
import cn from 'classnames';


const Prize = ({showModal, user}) => {
    const showSignup = useCallback(() => {
        showModal('signup')
    }, [showModal]);

    const {t} = useTranslation();

    return (
        <>
            <svg className={s.topLines} xmlns="http://www.w3.org/2000/svg" width="1216" height="210"
                 viewBox="0 0 1216 210" fill="none">
                <path d="M129 -733V4V4C129 51.4965 167.504 90 215 90H508C572.065 90 624 141.935 624 206V206"
                      stroke="black" stroke-width="2"/>
                <path d="M113 -733V4V4C113 60.333 158.667 106 215 106H508C563.228 106 608 150.772 608 206V206"
                      stroke="black" stroke-width="2"/>
                <path d="M97 -733V4V4C97 69.1696 149.83 122 215 122H508C554.392 122 592 159.608 592 206V206"
                      stroke="black" stroke-width="2"/>
                <circle cx="97" cy="4" r="4" fill="black"/>
                <circle cx="113" cy="4" r="4" fill="black"/>
                <circle cx="129" cy="4" r="4" fill="black"/>
                <circle cx="592" cy="206" r="4" fill="black"/>
                <circle cx="608" cy="206" r="4" fill="black"/>
                <circle cx="624" cy="206" r="4" fill="black"/>
            </svg>

            <div className={s.wrapper}>
                <div className={s.content}>
                    <div>
                        <div className={s.commands}>{t('Landing.StagesPrize.Commands')}</div>
                        <div className={s.prize}>1 000 000 ₽</div>
                    </div>
                    <div className={cn({[s.centered]: !!user})}>
                        <div className={s.offer}>{t('Landing.StagesPrize.Offer')}</div>
                        {!user && (
                            <Button onClick={showSignup}>{t('Landing.StagesPrize.Button')}</Button>
                        )}
                    </div>
                </div>
            </div>

            <svg className={s.bottomLines} width="508" height="210" viewBox="0 0 508 210" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M504 4V4C504 68.065 452.065 120 388 120H122C74.5035 120 36 158.504 36 206V206" stroke="black"
                      stroke-width="2"/>
                <path d="M488 4V4C488 59.2285 443.228 104 388 104H122C65.667 104 20 149.667 20 206V206" stroke="black"
                      stroke-width="2"/>
                <path d="M472 4V4C472 50.3919 434.392 88 388 88H122C56.8304 88 4 140.83 4 206V206" stroke="black"
                      stroke-width="2"/>
                <circle cx="4" cy="206" r="4" fill="black"/>
                <circle cx="20" cy="206" r="4" fill="black"/>
                <circle cx="36" cy="206" r="4" fill="black"/>
                <circle cx="472" cy="4" r="4" fill="black"/>
                <circle cx="488" cy="4" r="4" fill="black"/>
                <circle cx="504" cy="4" r="4" fill="black"/>
            </svg>
        </>
    );
};

const mapToProps = ({user}) => ({user});

export default connect(mapToProps, actions)(Prize);
