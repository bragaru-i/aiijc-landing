import {h, Fragment} from 'preact';
import {useMemo, useCallback} from 'preact/hooks';
import Button from '../../Button';
import s from './style.module.css';
import {connect} from "redux-zero/preact";
import actions from "../../../../../store/actions";
import {Link} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import cn from 'classnames';


const Triangle = ({showModal, user}) => {
    const dashes = useMemo(() => Array.from({length: 40}).map(() => ({
        top: `${Math.min(100, Math.random() * 100 + 28)}%`,
        left: `${Math.random() * 100 - 2}%`
    })), []);

    const showSignup = useCallback(() => {
        showModal('signup')
    }, [showModal]);
    const {t} = useTranslation();

    return (
        <div className={s.triangle}>
            <div className={s.info}>
                <div>
                    <div className={s.header}>{t('Landing.ContestTriangle.Header1')}</div>
                    <div className={s.subHeader}>
                        01 <span className={s.month}>{t('Landing.ContestTriangle.Month')}</span>
                        <div className={s.subHeaderShadow}>01</div>
                    </div>
                </div>

                <div>
                    <div className={s.header}>{t('Landing.ContestTriangle.Header2')}</div>
                    <div className={s.subHeader}>
                        10 000 000 ₽
                        <div className={s.subHeaderShadow}>10 000 000 ₽</div>
                    </div>
                </div>

                {dashes.map(({top, left}) => (
                    <svg className={s.dash}
                         style={{top, left}}
                         width="8" height="1" viewBox="0 0 8 1" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect width="8" height="1" fill="#72FF72"/>
                    </svg>
                ))}
            </div>

            <Button onClick={showSignup} className={cn({[s.hideSignup]: !!user})}>
                {t('Landing.ContestTriangle.Button')}
            </Button>
        </div>

    );
};

const mapToProps = ({user}) => ({user});

export default connect(mapToProps, actions)(Triangle);
