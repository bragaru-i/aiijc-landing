import {h, Fragment} from 'preact';
import {connect} from "redux-zero/preact";
import actions from "../../../../../store/actions";
import {useHistory} from 'react-router-dom';
import {api, FormField} from '../../../../../common';
import {useState, useCallback} from 'preact/hooks';
import {FaqDialogHeadline} from './FaqDialogHeadline';
import {useTranslation} from 'react-i18next';
import {Timer} from "../../../../../common/Timer";
import {ACTIVATION_CODE_TIMEOUT} from "../../../../../constants";
import './FaqRestoreActivateDialog.scss';

const FaqRestoreDialog = ({user}) => {
    const {t} = useTranslation();
    const history = useHistory();
    const [stage, setStage] = useState(1);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const now = new Date();
    const [codeExpiredAt, setCodeExpiredAt] = useState(new Date(now.valueOf() + ACTIVATION_CODE_TIMEOUT))
    const [isCodeActive, setIsCodeActive] = useState(true);

    const onChange = useCallback(
        ({target}) => {
            setData({...data, [target.name]: target.value});
            setErrors({...errors, [target.name]: null});
        },
        [data, errors]
    );

    const onSubmitEmail = useCallback(
        async (e) => {
            e.preventDefault();

            if (!data.email || data.email.length === 0) {
                setErrors({email: [t('errors.fieldEmpty')]});
                return;
            }

            setIsLoading(true);

            try {
                const res = await api.post('/api_v2/send_password_recovery/', data);
                if (res.details) {
                    setErrors({});
                    setStage(2);
                } else {
                    setErrors({email: [t('errors.unknown')]});
                }
            } catch (e) {
                if (e.res?.errors) {
                    setErrors(e.res?.errors);
                } else if (!navigator.onLine) {
                    setErrors({email: [t('errors.offline')]});
                } else if (e.status >= 500 && e.status < 600) {
                    setErrors({email: [t('errors.500')]});
                } else {
                    setErrors({email: [e.res?.email]});
                }
            } finally {
                setIsLoading(false);
            }
        },
        [data, errors]
    );

    const onSubmitCode = useCallback(
        async (e) => {
            e.preventDefault();

            if (!data.code || data.code.length === 0) {
                setErrors({code: [t('errors.fieldEmpty')]});
                return;
            }

            setIsLoading(true);
            try {
                const res = await api.post('/api_v2/validate_password_code/', data);
                setErrors({});
                setStage(3);
            } catch (e) {
                if (e.res?.errors) {
                    setErrors(e.res?.errors);
                } else if (!navigator.onLine) {
                    setErrors({code: [t('errors.offline')]});
                } else if (e.status >= 500 && e.status < 600) {
                    setErrors({code: [t('errors.500')]});
                } else {
                    setErrors({code: [e.res?.code]});
                }
            } finally {
                setIsLoading(false);
            }
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

    const onSubmitPassword = useCallback(
        async (e) => {
            e.preventDefault();

            if (!data.password || data.password.length === 0) {
                setErrors({password: [t('errors.fieldEmpty')]});
                return;
            }

            if (!data.newPassword || data.newPassword.length === 0) {
                setErrors({newPassword: [t('errors.fieldEmpty')]});
                return;
            }

            if (data.password !== data.newPassword) {
                setErrors({password: [t('Form.passwordsDifferent')], newPassword: [t('Form.passwordsDifferent')]});
                return;
            }

            setIsLoading(true);
            try {
                const res = await api.post('/api_v2/change_password/', data);
                console.log(res);
                if (res.details) {
                    setErrors({});
                    setStage(4);
                } else {
                    setErrors({password: [t('errors.unknown')]});
                }
            } catch (e) {
                if (e.res?.errors) {
                    setErrors(e.res?.errors);
                } else if (!navigator.onLine) {
                    setErrors({password: [t('errors.offline')], newPassword: [t('errors.offline')]});
                } else if (e.status >= 500 && e.status < 600) {
                    setErrors({password: [t('errors.500')], newPassword: [t('errors.500')]});
                } else {
                    setErrors({password: [e.res?.password], newPassword: [e.res?.password]});
                }
            } finally {
                setIsLoading(false);
            }
        },
        [data, errors]
    );

    return (
        <div className="FaqWrapperRestoreActivate">
            {stage === 1 && (
                <>
                    <FaqDialogHeadline
                        title={t('FAQ.FaqDialogRestore.stage1.title')}
                        svgSpriteID="lock"
                    />
                    <p>{t('FAQ.FaqDialogRestore.stage1.text')}</p>
                    <form onSubmit={onSubmitEmail} className="faq-form" novalidate>
                        <FormField
                            label="Email"
                            errors={errors.email}
                            labelFor="restore-form-email"
                            required
                        >
                            <input
                                className="field__input"
                                id="restore-form-email"
                                name="email"
                                type="email"
                                value={data.email}
                                onInput={onChange}
                            />
                        </FormField>
                        <button
                            type="submit"
                            className="btn primary"
                            disabled={isLoading}
                        >
                            {t('buttons.sendRestoreLetter')}
                        </button>
                    </form>
                </>
            )}
            {stage === 2 && (
                <>
                    <FaqDialogHeadline
                        title={t('FAQ.FaqDialogRestore.stage2.title')}
                        svgSpriteID="lock"
                    />
                    <p dangerouslySetInnerHTML={{__html: t('FAQ.FaqDialogRestore.stage2.text')}}></p>
                    <form onSubmit={onSubmitCode} className="faq-form" novalidate>
                        <FormField
                            label={t('SignUp.code')}
                            errors={errors.code}
                            labelFor="code-form-email"
                        >
                            <div className="activation_code-expire">
                                {isCodeActive ? (
                                    <>
                                        {t('SignUp.codeExpiredAt')}: <Timer endTime={codeExpiredAt} onTimerEnd={() => setIsCodeActive(false)} />
                                    </>
                                ) : (
                                        <a href="javascript:" onClick={sendNewCode}>{t('Form.sendNewCode')}</a>
                                    )}
                            </div>
                            <input
                                className="field__input"
                                id="code-form-email"
                                name="code"
                                type="text"
                                value={data.code}
                                onInput={onChange}
                            />
                        </FormField>
                        <button
                            type="submit"
                            className="btn primary"
                            disabled={isLoading}
                        >
                            {t('buttons.send')}
                        </button>
                    </form>
                </>
            )}
            {stage === 3 && (
                <>
                    <FaqDialogHeadline
                        title={t('FAQ.FaqDialogRestore.stage3.title')}
                        svgSpriteID="lock"
                    />

                    <form onSubmit={onSubmitPassword} className="faq-form new-password" novalidate>
                        <FormField
                            label={t('FAQ.FaqDialogRestore.stage3.newPassword')}
                            errors={errors.password}
                            labelFor="signin-form-password"
                        >
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                disabled={isLoading}
                                onInput={onChange}
                                id="signin-form-password"
                            />
                        </FormField>
                        <FormField
                            label={t('FAQ.FaqDialogRestore.stage3.newPasswordRepeat')}
                            errors={errors.newPassword}
                            labelFor="signin-form-password"
                        >
                            <div className="password-wrapper">
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={data.newPassword}
                                    disabled={isLoading}
                                    onInput={onChange}
                                />
                            </div>
                        </FormField>
                        <button
                            type="submit"
                            className="btn primary new-password"
                            disabled={isLoading}
                        >
                            {t('buttons.save')}
                        </button>
                    </form>
                </>
            )}
            {stage === 4 && (
                <>
                    <FaqDialogHeadline title={t('FAQ.FaqDialogRestore.stage4.title')} />
                    <div className="step-final">
                        <p>{t('FAQ.FaqDialogRestore.stage4.text')}</p>
                        <button
                            type="button"
                            className="btn primary"
                            onClick={() => history.push('/')}
                        >
                            {t('buttons.toLogIn')}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const mapToProps = ({user}) => ({user});

export default connect(mapToProps, actions)(FaqRestoreDialog);