import {h, Fragment} from 'preact';
import {useCallback, useMemo, useState} from 'preact/hooks';
import {connect} from 'redux-zero/preact';
import {useHistory} from 'react-router-dom';
import cn from 'classnames';
import actions from '../../../store/actions';
import Modal from "../../../common/Modal";
import {api, Checkbox, FormField} from '../../../common';
import {Timer} from "../../../common/Timer";
import {FaqDialogHeadline} from '../../Pages/faq/sections/Components/FaqDialogHeadline';
import '../../Pages/faq/sections/Components/FaqRestoreActivateDialog.scss';
import {useTranslation} from 'react-i18next';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ru from 'react-phone-input-2/lang/ru.json';
import './index.scss';

const VerificationModal = ({isShowing = true, setIsShowing, hideModal, login, ...props}) => {
    const history = useHistory();
    const {t, i18n} = useTranslation();
    const [stage, setStage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});
    const [device, setDevice] = useState(null);
    const [isCodeActive, setIsCodeActive] = useState(true);
    const [isTokenShown, setIsTokenShown] = useState(false);

    const setError = useCallback(err => {
        setErrors({details: [err]});
    }, [errors]);

    const onTimerEnd = useCallback(() => {
        setIsCodeActive(false);
        setError(t("VerificationModal.codeNotWorks"))
    }, [errors, isCodeActive]);

    const endTime = useMemo(() => device ? new Date((new Date(device.date)).valueOf() + device.expiration * 1000) : null, [device]);

    const toggleIsTokenShown = useCallback(() => {
        setIsTokenShown((isTokenShown) => !isTokenShown);
    }, []);

    const onInput = useCallback(
        ({target}) => {
            setData({...data, [target.name]: target.value});
            setErrors({...errors, [target.name]: null});
        },
        [data, errors]
    );

    const onChangeField = useCallback(
        (name, value) => {
            setData({...data, [name]: value});
            setErrors({...errors, [name]: null});
        },
        [data, errors]
    );

    const phoneInputChange = (phone) => {
        const prefix = '+';
        setData({...data, parent_phone: prefix + phone.replace(/[^0-9]+/g, '')});
    };

    const stopPropagation = useCallback((e) => {
        e.stopPropagation();
    }, []);

    const getPhoneSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.post('/api_v2/parent_confirm/', data);
            if (res.status === 'OK') {
                if (res.device) setDevice(res.device);
                setData({...data, usage: res.usage});
                setStage(1);
                setIsCodeActive(true);
                setErrors({});
            }
        } catch (e) {
            if (e.res && e.res.errors) {
                setErrors(e.res.errors);
            } else if (!navigator.onLine) {
                setError(t('errors.offline'));
            } else if (e.status >= 500 && e.status < 600) {
                setError(t('errors.500'));
            } else {
                setError(t('errors.unknown'))
            }
        }
        finally {
            setIsLoading(false);
        }
    }, [data, errors]);

    const checkCodeSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.post('/api_v2/verification/', data);
            if (res.status === 'OK') {
                setStage(2);
                login(res.user);
            }
        } catch (e) {
            if (e.res && e.res.errors) {
                setErrors(e.res.errors);
            } else if (!navigator.onLine) {
                setError(t('errors.offline'));
            } else if (e.status >= 500 && e.status < 600) {
                setError(t('errors.500'));
            } else {
                setError(t('errors.unknown'))
            }
        }
        finally {
            setIsLoading(false);
        }
    }, [data, errors]);

    const hasAllAgreements = data.has_terms_agreement && data.has_policy_agreement &&
        data.has_newsletters_agreement && data.has_personal_data_agreement;

    return (
        <Modal header={stage === 2 ? '' : t('Verification.title')} isShowing={isShowing} onClose={() => setIsShowing(!isShowing)} className="VerificationModal" {...props}>
            {stage === 0 && <div className="VerificationModalContent">
                {errors && errors.details && <div className="error login-form-error"><p>{t('errors.error')}</p>{errors.details.map(err => <span>{err}</span>)}</div>}
                <div className="text">
                    {t('Verification.text')}
                </div>
                <form onSubmit={getPhoneSubmit} novalidate>
                    <Checkbox name="has_terms_agreement" onChange={onChangeField} value={data.has_terms_agreement}>
                        <span dangerouslySetInnerHTML={{__html :t('Verification.Links.termsAgreement')}}/>
                    </Checkbox>
                    <Checkbox name="has_policy_agreement" onChange={onChangeField} value={data.has_policy_agreement}>
                        <span dangerouslySetInnerHTML={{__html :t('Verification.Links.policyAgreement')}}/>
                    </Checkbox>
                    <Checkbox name="has_newsletters_agreement" onChange={onChangeField} value={data.has_newsletters_agreement}>
                        <span dangerouslySetInnerHTML={{__html :t('Verification.Links.newslettersAgreement')}}/>
                    </Checkbox>
                    <Checkbox name="has_personal_data_agreement" onChange={onChangeField} value={data.has_personal_data_agreement}>
                        <span dangerouslySetInnerHTML={{__html :t('Verification.Links.personalDataAgreement')}}/>
                    </Checkbox>

                    <FormField label={t('Verification.parentPhone')} errors={errors.parent_phone} labelFor="parent_phone" className="phone">
                        <ReactPhoneInput
                            country={'ru'}
                            localization={i18n.language == 'ru' ? ru : undefined}
                            value={data.parent_phone}
                            onChange={phoneInputChange}
                            disabled={isLoading}
                            name="parent_phone"
                        />
                    </FormField>
                    <button type="submit" className="btn primary"
                        disabled={isLoading || !hasAllAgreements}>
                        {t('Verification.sendSMSBtn')}
                    </button>
                </form>
            </div>}

            {stage === 1 && <div className="VerificationModalContent">
                {errors && errors.details && <div className="error login-form-error"><p>{t('errors.error')}</p>{errors.details.map(err => <span>{err}</span>)}</div>}
                <div className="text">
                    {t('Verification.SMStext')}
                </div>
                <form onSubmit={checkCodeSubmit} novalidate>
                    <FormField errors={errors.token}>
                        <div className="verification_code-label-wrapper">
                            <label className="field__label" htmlFor="token-input">{t('VerificationModal.code')} </label>
                            <div className="verification_code-expire">
                                 {isCodeActive && device && (<>
                                    {t('VerificationModal.codeExpiredAt')} <Timer endTime={endTime} onTimerEnd={onTimerEnd} />
                                </>)}
                                {!isCodeActive && device && (<>
                                    <a
                                       href="#"
                                       onClick={getPhoneSubmit}
                                       className={cn({disabled: isLoading})}
                                    >
                                        Запросить код повторно
                                    </a>
                                </>)}
                            </div>
                        </div>
                        <div className="password-wrapper">
                            <input className="field__input" id="token-input" name="token"
                                type={isTokenShown ? 'text' : 'password'}
                                disabled={isLoading} value={data.token} onInput={onInput} />
                            <div className={cn('password-checkbox', {view: isTokenShown})}
                                onClick={toggleIsTokenShown} />
                        </div>
                    </FormField>
                    <button type="submit" className="btn primary submit-btn"
                        disabled={isLoading || !data.token || !isCodeActive}
                        >
                        {t("Verification.agreementBtn")}
                    </button>
                </form>
                <div className="noCode">
                    <span dangerouslySetInnerHTML={{__html: t("Verification.supportText")}} /> <a href="mailto:support@aiijc.com">support@aiijc.com</a>
                </div>
            </div>}

            {stage === 2 && <>
                <FaqDialogHeadline title={t('Verification.successTitle')} />
                <div className="FaqWrapperContent">
                    <div className="text">
                        {t('Verification.successText')}
                    </div>
                    <button
                        type="button"
                        className="btn primary"
                        onClick={() => {
                            setIsShowing(false);
                            history.push('/edit');
                        }}
                    >
                        {t('Verification.editProfileBtn')}
                    </button>
                </div>
            </>}
        </Modal>
    )
}

const mapToProps = ({user}) => ({user});
export default connect(mapToProps, actions)(VerificationModal);