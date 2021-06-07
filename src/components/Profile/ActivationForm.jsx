import {h, Component, Fragment} from 'preact';
import {api, FormField, pushAnalytics} from "../../common";
import {useCallback, useEffect, useState} from "preact/hooks";
import {connect} from "redux-zero/preact";
import actions from "../../store/actions";
import "./SignUpActivationModal.scss"
import {Timer} from "../../common/Timer";
import {ACTIVATION_CODE_TIMEOUT, TRACKER_GOALS} from "../../constants";
import {useTranslation} from 'react-i18next';


const ActivationForm = ({hideModal, onError, user, setIsActive, ...props}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});

    const now = new Date();
    const [codeExpiredAt, setCodeExpiredAt] = useState(new Date(now.valueOf() + ACTIVATION_CODE_TIMEOUT))
    const [isCodeActive, setIsCodeActive] = useState(true);

    const setError = err => {
        setErrors({details: [err]});
    }

    useEffect(() => onError(errors), [errors])

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            setIsLoading(true);
            api.post('/api_v2/confirm_activation_code/', data)
                .then(res => {
                    setIsActive(true);
                    hideModal();
                    setErrors({});
                    setIsLoading(false);
                    pushAnalytics(TRACKER_GOALS.ACTIVATION);
                })
                .catch(e => {
                    if (e.res) {
                        setErrors(e.res)
                    } else if (!navigator.onLine) {
                        setError(t('errors.offline'));
                    } else {
                        setError(t('errors.500'))
                    }
                    setIsLoading(false);
                });
        }, [data, errors]);

    const onInput = useCallback(
        ({target}) => {
            setData({...data, [target.name]: target.value});
            setErrors({...errors, [target.name]: null});
        },
        [data, errors]
    );

    const sendNewCode = useCallback(
        e => {
            e.preventDefault();

            setIsLoading(true);
            api.post('/api_v2/send_activation/', {email: user?.email})
                .then(res => {
                    const now = new Date();
                    setCodeExpiredAt(new Date(now.valueOf() + ACTIVATION_CODE_TIMEOUT));
                    setIsCodeActive(true);
                    setErrors({});
                    setIsLoading(false);
                })
                .catch(e => {
                    if (e.res) {
                        setErrors(e.res)
                    } else if (!navigator.onLine) {
                        setError(t('errors.offline'));
                    } else {
                        setError(t('errors.500'));
                    }
                    setIsLoading(false);
                });
        }, [user]
    )


    return (
        <form onSubmit={onSubmit} id="activation_code-form" className="activation_code-form" novalidate>
            <FormField errors={errors.details}>
                <div className="activation_code-label-wrapper">
                    <label className="field__label" htmlFor="activation_code-input">{t('SignUp.code')} </label>
                    <div className="activation_code-expire">
                        {isCodeActive ? (
                            <>
                                {t('SignUp.codeExpiredAt')} <Timer endTime={codeExpiredAt} onTimerEnd={() => setIsCodeActive(false)}/>
                            </>
                        ) : (
                            <a href="javascript:" onClick={sendNewCode}>{t('Form.sendNewCode')}</a>
                        )}
                    </div>
                </div>
                <input className="field__input" id="activation_code-input" name="activation_code" type="text"
                       disabled={isLoading} value={data.activation_code} onInput={onInput}/>
            </FormField>
            <button type="submit" className="btn primary submit-btn"
                    disabled={isLoading || !data.activation_code}>
                {t('buttons.activate')}
            </button>
        </form>
    )
}

ActivationForm.defaultProps = {
    onError: errors => {},
}

const mapToProps = ({user}) => ({user});
export default connect(mapToProps, actions)(ActivationForm);
