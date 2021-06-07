import {h, Fragment} from 'preact'
import {useState, useCallback} from 'preact/hooks'

import {api, Error, FormField} from '../../../../../common'
import Button from '../../../../../common/Components/Button'
import Heading from '../../../profile/components/Heading';
import {useTranslation} from "react-i18next";


const SettingsGeneralForm = () => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const init = {
        old_password: "",
        new_password: "",
        confirm: "",
    };
    const [inputs, setInputs] = useState(init);
    const [errors, setErrors] = useState({});

    const onChange = useCallback(({target}) => {
        setInputs({...inputs, [target.name]: target.value});
        setErrors({...errors, [target.name]: null});
    }, [inputs, errors]);

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        const errors = {};

        const requiredFields = ['new_password', 'old_password', "confirm"];
        requiredFields.forEach(field => {
            if (!inputs[field]) {
                errors[field] = t("Profile.required");
            }
        })

        if (inputs.new_password !== inputs.confirm) {
            errors.confirm = t("Profile.passNotEqual");
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            setIsLoading(true);
            await api.post('/api_v2/profile/change_password/', inputs);
            alertify.success(t("Profile.changePasswordSuccessMsg"));
            setInputs(init);
            setErrors({});
        } catch (e) {
            if (e.res) {
                setErrors(e.res);
            } else {
                alertify.error(t("errors.offline"));
            }
        } finally {
            setIsLoading(false);
        }
    }, [inputs, errors]);

    return (
        <>
            <Heading className="header-hide" text={t("Profile.changePassword")}/>
            <div className="container-editForms">
                <div className="edit-form-heading">
                    {t("Profile.changePassword")}
                </div>
                <Error error={errors.details}/>
                <FormField
                    colon={false}
                    label={t("Profile.oldPassword")}
                    labelFor="edit-form-old_password"
                    errors={errors.old_password}
                    required
                >
                    <input
                        className="field__input"
                        id="signin-form-old_password"
                        name="old_password"
                        type="password"
                        value={inputs.old_password}
                        onInput={onChange}
                    />
                </FormField>
                <FormField
                    colon={false}
                    label={t("Profile.newPassword")}
                    labelFor="edit-form-new_password"
                    errors={errors.new_password}
                    required
                >
                    <input
                        className="field__input"
                        id="signin-form-new_password"
                        name="new_password"
                        type="password"
                        value={inputs.new_password}
                        onInput={onChange}
                    />
                </FormField>
                <FormField
                    colon={false}
                    label={t("Profile.confirmPassword")}
                    labelFor="edit-form-confirm"
                    errors={errors.confirm}
                    required
                >
                    <input
                        className="field__input"
                        id="signin-form-confirm"
                        name="confirm"
                        type="password"
                        value={inputs.confirm}
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

export default SettingsGeneralForm;