import {h, Fragment} from 'preact';
import {api, FormField} from "../../common";
import {useCallback, useEffect, useState, useMemo} from "preact/hooks";
import {connect} from "redux-zero/preact";
import actions from "../../store/actions";
import {Timer} from "../../common/Timer";
import {useTranslation} from 'react-i18next';
import cn from "classnames";


const VerificationForm = ({hideModal, user, login}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});
    const [device, setDevice] = useState(null);
    const [isCodeActive, setIsCodeActive] = useState(true);
    const [isTokenShown, setIsTokenShown] = useState(false);

    const setError = useCallback(err => {
        setErrors({details: [err]});
    }, []);

    useEffect(async () => {
        const res = await api.get("/api_v2/verification/device/");
        setDevice(res?.device);
    }, []);

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.post('/api_v2/verification/', data);
            login(res.user);
            hideModal();
        } catch (e) {
            if (e.res && e.res.errors) {
                setError(e.res.errors.token);
            } else if (e.res && e.res.details) {
                setError(e.res.details);
            } else if (!navigator.onLine) {
                setError(t('errors.offline'));
            } else if (e.status >= 500 && e.status < 600) {
                setError(t('errors.500'))
            } else {
                setError(t('errors.unknown'))
            }
            setIsLoading(false);
        }
    }, [data, errors]);

    const onInput = useCallback(({target}) => {
        setData({...data, [target.name]: target.value});
        setErrors({...errors, [target.name]: null});
    }, [data, errors]);

    const onTimerEnd = useCallback(() => {
        setIsCodeActive(false);
        setError(t("VerificationModal.codeNotWorks"))
    });

    const endTime = useMemo(() => device ? new Date((new Date(device.date)).valueOf() + device.expiration * 1000) : null, [device]);

    const toggleIsTokenShown = useCallback(() => {
        setIsTokenShown((isTokenShown) => !isTokenShown);
    }, []);

    return (
        <form onSubmit={onSubmit} novalidate>
            <FormField errors={errors.details}>
                <div className="verification_code-label-wrapper">
                    <label className="field__label" htmlFor="token-input">{t('VerificationModal.code')} </label>
                    <div className="verification_code-expire">
                        {isCodeActive && device && (<>
                            {t('VerificationModal.codeExpiredAt')} <Timer endTime={endTime} onTimerEnd={onTimerEnd}/>
                        </>)}
                    </div>
                </div>
                <div className="password-wrapper">
                    <input className="field__input" id="token-input" name="token"
                           type={isTokenShown ? 'text' : 'password'}
                           disabled={isLoading} value={data.token} onInput={onInput}/>
                    <div className={cn('password-checkbox', {view: isTokenShown})}
                         onClick={toggleIsTokenShown} />
                </div>
            </FormField>
            <button type="submit" className="btn primary submit-btn"
                    disabled={isLoading || !data.token || !isCodeActive}>
                {t("VerificationModal.authButton")}
            </button>
        </form>
    )
}


const mapToProps = ({user}) => ({user});
export default connect(mapToProps, actions)(VerificationForm);
