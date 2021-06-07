import {h} from 'preact'
import {useCallback} from 'preact/hooks'
import cn from 'classnames'
import {useTranslation} from 'react-i18next'

import {connect} from "redux-zero/preact";
import actions from "../../../../store/actions";

import s from './HeroBox.module.scss'
import Button from '../components/Button'
import {pushAnalytics} from '../../../../common';
import {TRACKER_GOALS} from '../../../../constants';

const HeroBox = ({showModal, user, rowClass}) => {
    const {t} = useTranslation()
    const showSignup = useCallback(() => {
        showModal('signup')
        pushAnalytics(TRACKER_GOALS.OPEN_SIGNUP_MODAL);
    }, [showModal]);

    return (
        <heading className={cn(s.herobox)}>

            < h1 dangerouslySetInnerHTML={{__html: t('Landing.Contest.Header')}} className={cn(s.herobox_heading)} />
            <div className={cn(rowClass, s.starts)}>
                <div className={s["starts-box"]}>
                    <div className={s["starts-box__item--heading"]}>{t('Landing.ContestTriangle.Header2')}</div>
                    <div className={s["starts-box__item"]} dangerouslySetInnerHTML={{__html: t('Landing.ContestTriangle.Prize')}} />
                </div>
                <div className={s["starts-box"]}>
                    <div className={s["starts-box__item--heading"]}>{t('Landing.ContestTriangle.Header1')}</div>
                    <div className={s["starts-box__item"]}>01.02</div>
                </div>

            </div>
            <div className={cn(rowClass, s.cta)}>
                <Button onClick={showSignup} className={cn({[s.hideSignup]: !!user})} size="lg" >{t('Landing.Nav.Button')}</Button>
            </div>
            <div className={s.eclipseWrapper}>

                < div className={s.eclipse} />

            </div>
            <div className={s.butterfly} />
            <div className={s.squareBackground} />
        </heading>
    )
}

const mapToProps = ({user}) => ({user});

export default connect(mapToProps, actions)(HeroBox)
