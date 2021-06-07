import {h} from 'preact'
import {useCallback} from 'preact/hooks';
import {useTranslation} from 'react-i18next'
import {connect} from "redux-zero/preact";
import actions from "../../../../store/actions";

import cn from 'classnames';

import s from './Prize.module.scss'
import Button from '../components/Button';
import {pushAnalytics} from '../../../../common';
import {TRACKER_GOALS} from '../../../../constants';

const Prize = ({rowClass, showModal, user}) => {
    const {t} = useTranslation()
    const showSignup = useCallback(() => {
        showModal('signup')
        pushAnalytics(TRACKER_GOALS.OPEN_SIGNUP_MODAL);
    }, [showModal]);
    return (
        <section className={s['prize']}>
            <div className={cn(rowClass, s["prizeCard"])}>
                < div className={s['prizeCard-text']} dangerouslySetInnerHTML={{__html: t('Landing.StagesPrize.Commands')}} />
                <div className={s['prizeCard-text2']} dangerouslySetInnerHTML={{__html: t('Landing.StagesPrize.Offer')}} />
                <div className={s['prizeCard-img']} />
                <div className={cn(s.cta)}>
                    <Button size="lg" onClick={showSignup}  className={cn({[s.hideSignup]: !!user})}>
                        {t('Landing.StagesPrize.Button')}
                    </Button>
                </div>
            </div>
        </section>
    )
}
const mapToProps = ({user}) => ({user});

export default connect(mapToProps, actions)(Prize)
