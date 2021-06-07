import {h, Component} from 'preact';
import Modal from "../../common/Modal";
import {api, FormField, Error, Checkbox, pushAnalytics} from "../../common";
import {useCallback, useEffect, useState} from "preact/hooks";
import {PasswordInput} from "../../common/form/PasswordInput";
import {connect} from "redux-zero/preact";
import actions from "../../store/actions";
import AsyncSelect from "react-select/async";
import './SignUpModal.scss';

import {useTranslation} from 'react-i18next';
import {TRACKER_GOALS} from "../../constants";


const EMAIL_EXISTS_ERROR = 'email exists'


const SignUpModal = ({isShowing, login, showModal, ...props}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});

    const setError = err => {
        setErrors({details: [err]});
    }

    useEffect(() => {
        if (isShowing) {
            window.location.hash = '#registration';
        } else if (window.location.hash === '#registration') {
            window.location.hash = '';
        }
    }, [isShowing])

    useEffect(() => {
        if (errors.email) {
            if (errors.email === EMAIL_EXISTS_ERROR ||
                (Array.isArray(errors.email) && errors.email.some(err => err === EMAIL_EXISTS_ERROR))) {
                showModal('email_exists');
            }
        }
    }, [errors]);

    useEffect(() => {
        if (data.agree_to_all) {
            setData({...data, contest_rules_agreed: true, privacy_policy_agreed: true, personal_data_agreed: true});
        } else {
            setData({...data, contest_rules_agreed: false, privacy_policy_agreed: false, personal_data_agreed: false});
        }
    }, [data.agree_to_all])

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            const errors = {};
            const requiredFields = ['login', 'email', /*'first_name', 'last_name', 'birth', 'gender',*/ 'country', 'password', 'repeat_password'];
            requiredFields.forEach(field => {
                if (!data[field]) {
                    errors[field] = [t('Form.required')];
                }
            })

            if (data.repeat_password && data.password !== data.repeat_password) {
                errors.repeat_password = [t('Form.passwordsDifferent')];
            }

            if (data.birth && data.birth.length !== 10) {
                errors.birth = [t('Form.invalidValue')];
            }
            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                return;
            }

            setIsLoading(true);
            api.postJson('/api_v2/user/', {...data, address_set: [{country: data.country, city: data.city || undefined}]})
                .then(res => {
                    login(res);
                    showModal('signup_activation')
                    setErrors({});
                    setData({});
                    setIsLoading(false);
                    pushAnalytics(TRACKER_GOALS.SIGNUP);
                })
                .catch(e => {
                    if (e.res) {
                        setErrors(e.res)
                    } else if (!navigator.onLine) {
                        setError(t('errors.offline'));
                    } else if (e.status >= 500 && e.status < 600) {
                        setError(t('errors.500'))
                    } else {
                        setError(t('errors.unknown'))
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

    const onChangeField = useCallback(
        (name, value) => {
            const newData = {...data, [name]: value};
            const newErrors = {...errors, [name]: null};
            if (name === 'country') {
                newData.city = null;
                newErrors.city = null;
            }
            setData(newData);
            setErrors(newErrors);
        },
        [data, errors]
    );

    const searchCountries = useCallback(
        value => {
            if (value.length < 3) {
                return Promise.resolve([]);
            }
            return api.get('/api_v2/countries/', {search: value})
                .catch(e => {
                    if (e.res) {
                        setErrors(e.res)
                    } else if (!navigator.onLine) {
                        setError(t('errors.offline'));
                    } else if (e.status >= 500 && e.status < 600) {
                        setError(t('errors.500'))
                    } else {
                        setError(t('errors.unknown'))
                    }
                    setIsLoading(false);
                });
        }, []
    )

    const searchCities = useCallback(
        value => {
            if (value.length < 3) {
                return Promise.resolve([]);
            }
            return api.get('/api_v2/cities/', {search: value, country_id: data.country?.id})
                .catch(e => {
                    if (e.res) {
                        setErrors(e.res)
                    } else if (!navigator.onLine) {
                        setError(t('errors.offline'));
                    } else if (e.status >= 500 && e.status < 600) {
                        setError(t('errors.500'))
                    } else {
                        setError(t('errors.unknown'))
                    }
                    setIsLoading(false);
                });
        }, [data]
    )

    const cityNoOptionsMessage = useCallback(({inputValue}) => {
        if (inputValue.length < 3) {
            return t('Form.enter3chars');
        }
        return t('Form.noData');
    }, []);

    // const stopPropagation = useCallback((e) => {
    //     e.stopPropagation();
    // }, []);


    return (
        <Modal isShowing={isShowing} header={t('Form.Registration')} className="SignUpModal" {...props}>
            <Error error={errors.details}/>
            <form onSubmit={onSubmit} id="signin-form" className="login-form" novalidate>
                <FormField label={t('Form.login')} errors={errors.login} labelFor="signup-form-login" required>
                    <input className="field__input" id="signup-form-login" name="login" type="text"
                           disabled={isLoading} value={data.login} onInput={onInput}/>
                </FormField>
                <FormField label="Email" errors={errors.email} labelFor="signup-form-email" required>
                    <input className="field__input" id="signup-form-email" name="email" type="email"
                           disabled={isLoading} value={data.email} onInput={onInput}/>
                </FormField>
                {/*<FormField label={t('Form.name')} errors={errors.first_name} labelFor="signup-form-first_name" required>*/}
                {/*    <input className="field__input" id="signup-form-first_name" name="first_name" type="text"*/}
                {/*           disabled={isLoading} value={data.first_name} onInput={onInput}/>*/}
                {/*</FormField>*/}
                {/*<FormField label={t('Form.lastName')} errors={errors.last_name} labelFor="signup-form-last_name" required>*/}
                {/*    <input className="field__input" id="signup-form-last_name" name="last_name" type="text"*/}
                {/*           disabled={isLoading} value={data.last_name} onInput={onInput}/>*/}
                {/*</FormField>*/}
                <FormField label={t('Form.country')} errors={errors.country} labelFor="signup-form-country" required>
                    <AsyncSelect loadOptions={searchCountries} noOptionsMessage={cityNoOptionsMessage}
                                 loadingMessage={() => t('Form.loading')} className="select" classNamePrefix="select"
                                 value={data.country} disabled={isLoading} placeholder=""
                                 getOptionLabel={opt => opt.name} getOptionValue={opt => opt.id}
                                 onChange={v => onChangeField('country', v)}/>
                </FormField>
                {data.country && (
                    <FormField label={t('Form.city')} errors={errors.city} labelFor="signup-form-city">
                        <AsyncSelect loadOptions={searchCities} noOptionsMessage={cityNoOptionsMessage}
                                     loadingMessage={() => t('Form.loading')} className="select" classNamePrefix="select"
                                     value={data.city} disabled={isLoading} placeholder=""
                                     getOptionLabel={opt => opt.region_name ? `${opt.name} (${opt.region_name})` : opt.name}
                                     getOptionValue={opt => opt.id}
                                     onChange={v => onChangeField('city', v)}/>
                    </FormField>
                )}
                {/*<FormField label={t('Form.birth')} errors={errors.birth} labelFor="dateInput__birth" required>*/}
                {/*    <DateInput name="birth" disabled={isLoading} value={data.birth} onChange={onChangeField}/>*/}
                {/*</FormField>*/}
                {/*<Switch value={data.gender} name="gender" firstLabel={t('Form.genderMale')} secondLabel={t('Form.genderFemale')}*/}
                {/*        firstValue="m" secondValue="f" disabled={isLoading} onChange={onChangeField}/>*/}
                <hr/>
                <FormField label={t('Form.password')} errors={errors.password} labelFor="signup-form-password" required>
                    <PasswordInput name="password" value={data.password} disabled={isLoading} onInput={onInput}
                                   id="signup-form-password"/>
                </FormField>
                <FormField label={t('Form.passwordRepeat')} errors={errors.repeat_password}
                           labelFor="signup-form-repeat_password" required>
                    <PasswordInput name="repeat_password" value={data.repeat_password} disabled={isLoading} onInput={onInput}
                                   id="signup-form-repeat_password"/>
                </FormField>
                {/* <Checkbox name="contest_rules_agreed" onChange={onChangeField} value={data.contest_rules_agreed}>
                    {t('Form.agreeWithRules')} <a href="/faq/legal/" target="_blank" onClick={stopPropagation}>{t('Form.rules')}</a></Checkbox>
                <Checkbox name="privacy_policy_agreed" onChange={onChangeField} value={data.privacy_policy_agreed}>
                    {t('Form.agreeWith')} <a href="https://cups.mail.ru/faq/legal/privacy/" target="_blank" onClick={stopPropagation}>{t('Form.policy')}</a></Checkbox>
                <Checkbox name="personal_data_agreed" onChange={onChangeField} value={data.personal_data_agreed}>
                    {t('Form.agreeWith')} <a href="https://cups.mail.ru/faq/legal/ua/" target="_blank" onClick={stopPropagation}>{t('Form.personalData')}</a></Checkbox> */}
                <Checkbox name="agree_to_all" onChange={onChangeField} value={data.agree_to_all}>
                    <span dangerouslySetInnerHTML={{__html: t('Form.agree_to_all')}}></span>
                </Checkbox>
                <button type="submit" className="btn primary"
                        disabled={isLoading || !data.contest_rules_agreed || !data.privacy_policy_agreed || !data.personal_data_agreed}>
                    {t('buttons.Registration')}</button>
            </form>
        </Modal>
    )
}

const mapToProps = ({}) => ({});
export default connect(mapToProps, actions)(SignUpModal);
