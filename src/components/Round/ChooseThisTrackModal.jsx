import {h} from 'preact'
import {connect} from 'redux-zero/preact';
import {useCallback, useEffect, useMemo, useState} from 'preact/hooks';
import {useTranslation} from 'react-i18next';

import {api, showError, showSuccess} from '../../common';
import actions from '../../store/actions';

import Button from '../../common/Components/Button';
import Modal from '../../common/Modal'

import './ChooseThisTrackModal.scss'

const ChooseThisTrackModal = ({isShowing, onClose, team, rounds, getRounds, trackRegistration, setTrackRegistration}) => {

    const [isLoading, setIsLoading] = useState(false)

    const {t} = useTranslation();

    const isAvailableSending = useMemo(() => {
        return !!trackRegistration && trackRegistration.teamId && trackRegistration.trackId
    }, [trackRegistration])

    const submitHandler = useCallback(() => {
        if (isAvailableSending) {
            setIsLoading(() => true)
            api.post(`/api_v2/teams/${trackRegistration.teamId}/track/${trackRegistration.trackId}/`)
                .then(() => {
                    showSuccess(t('TrackModal.success'))
                })
                .catch(e =>
                    showError(e.res?.detail || e.res?.details || e.res?.errors?.any || t('errors.unknown')))
                .finally(
                    () => {
                        setIsLoading(() => false)
                        onClose()
                        setTrackRegistration(null, null)
                    })
        }

    }, [isAvailableSending])

    useEffect(() => {
        getRounds()
    }, [isShowing])

    return (
        <Modal isShowing={isShowing} onClose={onClose} header={t('TrackModal.heading')} className="modal-chooseTrack" >
            {t('TrackModal.body')}
            <div className="two-btns">
                <Button disabled={isLoading || !isAvailableSending || team?.participants.length<3 } onClick={submitHandler}>{t('teams.form.deleteTeamModal.submitBtn')}</Button>
                <Button onClick={onClose} variant="secondary">{t('teams.form.deleteTeamModal.closeBtn')}</Button>
            </div>
        </Modal>
    )
}

const mapToProps = ({team, rounds, trackRegistration}) => ({team, rounds, trackRegistration});
export default connect(mapToProps, actions)(ChooseThisTrackModal)
