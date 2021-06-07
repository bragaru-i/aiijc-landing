import {useCallback, useState} from "preact/hooks";
import {connect} from 'redux-zero/preact'
import AsyncSelect from "react-select/async";
import {DateInput, Error, FormField} from '../../../../../common'
import Button from '../../../../../common/Components/Button'
import Heading from '../../../profile/components/Heading'
import actions from "../../../../../store/actions";
import {api} from '../../../../../common';
import {useTranslation} from "react-i18next";


const EditGeneralForm = ({user, login}) => {
    const {t} = useTranslation();

    const [inputs, setInputs] = useState({
        last_name: user.last_name,
        first_name: user.first_name,
        login: user.login,
        birth: user.birth,
        country: user.address_set?.[0]?.country,
        city: user.address_set?.[0]?.city,
        about: user.userextra?.about || ''
    })
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = useCallback((...args) => {
        const name = args[0]?.target?.name || args[0];
        const value = args[0]?.target?.value || args[1] || "";

        if (name === 'country') {
            inputs.city = null;
            errors.city = null;
        }

        setInputs({...inputs, [name]: value});
        setErrors({...errors, [name]: null});
    }, [inputs, errors]);


    const onSubmit = useCallback(async (event) => {
        event.preventDefault();
        const errors = {};

        const requiredFields = ['last_name', 'first_name', 'login', "birth", 'country', 'city'];
        requiredFields.forEach(field => {
            if (!inputs[field]) {
                errors[field] = t("Profile.required");
            }
        })

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            setIsLoading(true);
            const data = {
                ...inputs, address_set: [{country: inputs.country, city: inputs.city || undefined}],
                userextra: {about: inputs.about}
            };
            const user = await api.patchJson('/api_v2/profile/', data);
            login(user);
            alertify.success(t("Profile.savedMsg"));
            setErrors({});
        } catch (e) {
            if (e.res) {
                setErrors(e.res);
            } else {
                alertify.error(t('errors.offline'));
            }
        } finally {
            setIsLoading(false);
        }
    }, [inputs, errors]);

    const cityNoOptionsMessage = useCallback(({inputValue}) => {
        if (inputValue.length < 3) {
            return t('Form.enter3chars');
        }
        return t('Form.noData');
    }, []);

    const searchCountries = useCallback(async (value) => {
        if (value.length < 3) {
            return [];
        }

        try {
            return await api.get('/api_v2/countries/', {search: value});
        } catch (e) {
            if (e.res) {
                setErrors(e.res)
            } else {
                alertify.error(t('errors.offline'));
            }
        }
    }, []);

    const searchCities = useCallback(async (value) => {
        if (value.length < 3) {
            return [];
        }
        try {
            return await api.get('/api_v2/cities/', {search: value, country_id: inputs.country?.id});
        } catch (e) {
            if (e.res) {
                setErrors(e.res)
            } else {
                alertify.error(t('errors.offline'));
            }
        }
    }, [inputs]);

    return (
        <>
            <Heading className="header-hide" text={t("Profile.generalInfo")}/>

            <div className="container-editForms">
                <div className="edit-form-heading">
                    {t("Profile.generalInfo")}
                </div>
                <Error error={errors.details}/>
                <FormField
                    colon={false}
                    label={t("Profile.lastName")}
                    labelFor="edit-form-surname"
                    errors={errors.last_name}
                    required>
                    <input
                        className="field__input"
                        id="signin-form-email"
                        name="last_name"
                        type="text"
                        value={inputs.last_name}
                        onInput={onChange}
                    />
                </FormField>
                <FormField
                    colon={false}
                    label={t("Profile.firstName")}
                    labelFor="edit-form-last_name"
                    errors={errors.first_name}
                    required>
                    <input
                        className="field__input"
                        id="signin-form-email"
                        name="first_name"
                        type="text"
                        value={inputs.first_name}
                        onInput={onChange}
                    />
                </FormField>
                <FormField
                    colon={false}
                    label={t("Profile.login")}
                    labelFor="edit-form-login"
                    errors={errors.login}
                    required>
                    <input
                        className="field__input"
                        id="edit-form-login"
                        name="login"
                        type="text"
                        value={inputs.login}
                        onInput={onChange}
                    />
                </FormField>
                <FormField colon={false} label={t("Profile.birth")} errors={errors.birth} labelFor="dateInput__birth" required>
                    <DateInput name="birth" value={inputs.birth} onChange={onChange}/>
                </FormField>

                <FormField colon={false} label={t("Profile.country")} errors={errors.country} required>
                    <AsyncSelect loadOptions={searchCountries} noOptionsMessage={cityNoOptionsMessage}
                                 loadingMessage={() => t('Form.loading')} className="select" classNamePrefix="select"
                                 value={inputs.country} placeholder=""
                                 getOptionLabel={opt => opt.name} getOptionValue={opt => opt.id}
                                 onChange={v => onChange('country', v)}/>
                </FormField>


                {inputs.country && (
                    <FormField colon={false} label={t("Profile.city")} errors={errors.city} required>
                        <AsyncSelect loadOptions={searchCities} noOptionsMessage={cityNoOptionsMessage}
                                     loadingMessage={() => t('Form.loading')} className="select"
                                     classNamePrefix="select"
                                     value={inputs.city} placeholder=""
                                     getOptionLabel={opt => opt.region_name ? `${opt.name} (${opt.region_name})` : opt.name}
                                     getOptionValue={opt => opt.id}
                                     onChange={v => onChange('city', v)}/>
                    </FormField>
                )}

                <FormField
                    colon={false}
                    label={t("Profile.aboutLabel")}
                    labelFor="edit-form-about"
                    errors={errors.about}
                >
                    <textarea
                        className="field__input"
                        id="signin-form-about"
                        name="about"
                        type="text"
                        value={inputs.about}
                        onInput={onChange}
                    />
                </FormField>
                <Button onClick={onSubmit} fullWidth disabled={isLoading}>
                    {t("Profile.save")}
                </Button>
            </div>
        </>
    )
}

const mapToProps = ({user}) => ({user})

export default connect(mapToProps, actions)(EditGeneralForm)
