import {useState, useCallback} from 'preact/hooks'
import {connect} from 'redux-zero/preact'
import {api, Error, FormField, getSocialByProvider} from '../../../../common'
import Button from '../../../../common/Components/Button'
import {Icon} from '../../../../common/icons'
import Heading from '../../profile/components/Heading'
import actions from '../../../../store/actions'
import EditSideBar from './EditSideBar'
import {useTranslation} from "react-i18next";
import {SOCIALS, VK, FACEBOOK, GITHUB, INSTAGRAM} from '../../../../constants';
import './edit.scss'


const EditSocialForm = ({user, login}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const userLinks = user.userlink_set || [];

    const [inputs, setInputs] = useState(Object.fromEntries(SOCIALS.map(({provider}) => {
        let userLink = userLinks.find(({external_app_name}) => provider === external_app_name);
        return [provider, userLink?.external_id || ''];
    })));

    const [errors, setErrors] = useState({});

    const onChange = useCallback(({target}) => {
        setInputs({...inputs, [target.name]: target.value});
        setErrors({...errors, [target.name]: null});
    }, [inputs, errors]);

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();

        const userlink_set = Object.entries(inputs).map(([external_app_name, external_id]) => {
            const social = getSocialByProvider(external_app_name);
            return {external_app_name, external_id, external_app: social?.id};
        }).filter(({external_id}) => !!external_id);

        try {
            setIsLoading(true);
            const user = await api.patchJson('/api_v2/profile/', {userlink_set});
            login(user);
            alertify.success(t("Profile.savedMsg"));
            setErrors({});
        } catch (e) {
            if (e.res?.userlink_set) {
                const errors = e.res.userlink_set.map(({external_app_name, external_id}) => {
                    const app = external_app_name?.[0];
                    const error = external_id?.[0];
                    return [app, error];
                }).filter(([app]) => app);
                setErrors(Object.fromEntries(errors));
            } else {
                alertify.error(t("errors.offline"));
            }
        } finally {
            setIsLoading(false);
        }
    }, [inputs, errors]);

    return (
        <>
            <Heading text={t("Profile.social")} className="header-hide"/>
            <div className="container-editForms">
                <div className="edit-form-heading">
                    {t("Profile.social")}
                </div>
                <Error error={errors.details}/>
                <FormField
                    colon={false}
                    label="Facebook"
                    labelFor="edit-form-fb"
                    errors={errors[FACEBOOK]}
                >
                    <div className="inputWrapper">
                        <Icon name="fb-icon" width="18px" className="input-ico"
                              fill={inputs[FACEBOOK] ? "#2848BA" : "#A9A9A9"}/>
                        <input
                            className="field__input"
                            id="signin-form-fb"
                            name={FACEBOOK}
                            type="text"
                            value={inputs[FACEBOOK]}
                            onInput={onChange}
                        />
                    </div>
                </FormField>
                <FormField
                    colon={false}
                    label="Vkontakte"
                    labelFor="edit-form-vk"
                    errors={errors[VK]}
                >
                    <div className="inputWrapper">
                        <Icon name="vk-icon" width="18px" className="input-ico"
                              fill={inputs[VK] ? "#2848BA" : "#A9A9A9"}/>
                        <input
                            className="field__input"
                            id="signin-form-vk"
                            name={VK}
                            type="text"
                            value={inputs[VK]}
                            onInput={onChange}
                        />
                    </div>

                </FormField>
                <FormField
                    colon={false}
                    label="Instagram"
                    labelFor="edit-form-insta"
                    errors={errors[INSTAGRAM]}
                >
                    <div className="inputWrapper">
                        <Icon name="insta-icon" width="18px" className="input-ico"
                              fill={inputs[INSTAGRAM] ? "#2848BA" : "#A9A9A9"}/>
                        <input
                            className="field__input"
                            id="signin-form-insta"
                            name={INSTAGRAM}
                            type="text"
                            value={inputs[INSTAGRAM]}
                            onInput={onChange}
                        />
                    </div>
                </FormField>
                <FormField
                    colon={false}
                    label="Github"
                    labelFor="edit-form-github"
                    errors={errors[GITHUB]}
                >
                    <div className="inputWrapper">
                        <Icon name="github-icon" width="18px" className="input-ico"
                              fill={inputs.github ? "#2848BA" : "#A9A9A9"}/>
                        <input
                            className="field__input"
                            id="signin-form-github"
                            name={GITHUB}
                            type="text"
                            value={inputs[GITHUB]}
                            onInput={onChange}
                        />
                    </div>
                </FormField>

                <Button onClick={onSubmit} fullWidth disabled={isLoading}>
                    {t("Profile.save")}
                </Button>
            </div>
        </>
    )
}


const EditGeneral = ({screen, user, login}) => {
    const {t} = useTranslation();

    if (!!screen && screen.width > 767) {
        return (
            <>
                <Heading text={t("Profile.edit")}/>
                <div className="main-edit-container">
                    <EditSocialForm user={user} login={login}/>
                    <EditSideBar/>
                </div>
            </>
        );
    }

    return <EditSocialForm user={user} login={login}/>;
}

const mapToProps = ({screen, user}) => ({screen, user})

export default connect(mapToProps, actions)(EditGeneral)
