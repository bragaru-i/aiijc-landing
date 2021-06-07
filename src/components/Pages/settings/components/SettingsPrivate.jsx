import {connect} from 'redux-zero/preact'
import {useState, useCallback, useEffect} from 'preact/hooks'
import cn from 'classnames'
import {api, Checkbox, showError, showSuccess} from '../../../../common'
import Button from '../../../../common/Components/Button'
import Heading from '../../profile/components/Heading'

import '../../edit/components/edit.scss'
import './SettingsUnuscribe.scss'

import SettingsSideBar from './SettingsSideBar'
import {useTranslation} from "react-i18next";
import {Spinner} from "../../../../common/Components/Spinner";

const SettingsPrivateForm = ({screen}) => {
    const {t} = useTranslation();

    const [inputs, setInputs] = useState(null);
    const [isLoading, setIsLoading] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await api.get(
                    `/api_v2/profile/privacy_settings/`
                );
                setInputs(res);
            } catch (e) {
                if (!navigator.onLine) {
                    showError(t('errors.offline'));
                } else if ((e.status >= 500 && e.status < 600) || e.status === 404) {
                } else {
                    showError(t('errors.unknown'));
                }
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const onChange = useCallback(
        (name, value) => {
            const newData = {...inputs, [name]: !!value};
            setInputs(newData);
        },
        [inputs]
    );

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true);
                const res = await api.patch(
                    `/api_v2/profile/privacy_settings/`,
                    inputs
                );
                setInputs(res);
                showSuccess(t("Profile.savedMsg"));
            } catch (e) {
                if (!navigator.onLine) {
                    showError(t('errors.offline'));
                } else if ((e.status >= 500 && e.status < 600) || e.status === 404) {
                } else {
                    showError(t('errors.unknown'));
                }
            }
            finally {
                setIsLoading(false);
            }
        }, [inputs]);

    return (
        <>
            <Heading className="header-hide" text="Рассылки"/>
            <div className="container-editForms">
                <div className="edit-form-heading">
                    {t('Profile.Private.title')}
                </div>
                <div className="settings-unuscribe-text">
                    {t('Profile.Private.info')}
                </div>

                {inputs && !isLoading && <>
                    <Checkbox disabled={inputs.is_private}
                               className={cn("settings-checkbox", {["settings-checkbox--disabled"]: inputs.is_private})}
                               name="last_name" onChange={onChange} value={inputs.last_name}>
                        {t('Profile.Private.lastName')}
                    </Checkbox>
                        <Checkbox disabled={inputs.is_private}
                        className={cn("settings-checkbox", {["settings-checkbox--disabled"]: inputs.is_private})}
                        name="first_name" onChange={onChange} value={inputs.first_name}>
                        {t('Profile.Private.firstName')}
                        </Checkbox>

                    {/*<Checkbox disabled={inputs.is_private}*/}
                    {/*          className={cn("settings-checkbox", {["settings-checkbox--disabled"]: inputs.is_private})}*/}
                    {/*          name="fathersname" onChange={onChange} value={inputs.fathersname}>*/}
                    {/*    Fathers Name*/}
                    {/*</Checkbox>*/}
                        <Checkbox disabled={inputs.is_private}
                        className={cn("settings-checkbox", {["settings-checkbox--disabled"]: inputs.is_private})}
                        name="userlink_set" onChange={onChange} value={inputs.userlink_set}>
                        {t('Profile.Private.socialMedia')}
                        </Checkbox>
                    {/*<Checkbox disabled={inputs.is_private}*/}
                    {/*          className={cn("settings-checkbox", {["settings-checkbox--disabled"]: inputs.is_private})}*/}
                    {/*          name="adress" onChange={onChange} value={inputs.adress}>*/}
                    {/*    Address*/}
                    {/*</Checkbox>*/}
                    {/*<Checkbox disabled={inputs.is_private}*/}
                    {/*          className={cn("settings-checkbox", {["settings-checkbox--disabled"]: inputs.is_private})}*/}
                    {/*          name="school" onChange={onChange} value={inputs.school}>*/}
                    {/*    School*/}
                    {/*</Checkbox>*/}
                        <Checkbox disabled={inputs.is_private}
                        className={cn("settings-checkbox", {["settings-checkbox--disabled"]: inputs.is_private})}
                        name="userextra" onChange={onChange} value={inputs.userextra}>
                        {t('Profile.Private.userextra')}
                        </Checkbox>
                        <Checkbox disabled={inputs.is_private}
                        className={cn("settings-checkbox", {["settings-checkbox--disabled"]: inputs.is_private})}
                        name="birth" onChange={onChange} value={inputs.birth}>
                        {t('Profile.Private.birth')}
                        </Checkbox>
                    {/*<Checkbox disabled={inputs.is_private}*/}
                    {/*          className={cn("settings-checkbox", {["settings-checkbox--disabled"]: inputs.is_private})}*/}
                    {/*          name="age" onChange={onChange} value={inputs.age}>*/}
                    {/*    Age*/}
                    {/*</Checkbox>*/}
                        <hr/>
                        <Checkbox className="settings-checkbox settings-checkbox--is_private" name="is_private"
                        onChange={onChange} value={inputs.is_private}>
                        <span>{t('Profile.Private.privateAccount')}
                        <p>{t('Profile.Private.privateAccountInfo')}</p>
                        </span>
                        </Checkbox>

                        <div className="settings-unuscribe-button">
                        <Button onClick={onSubmit} fullWidth>
                            {t("Profile.save")}
                        </Button>
                        </div>
                </>}
                {isLoading && <Spinner />}
            </div>
        </>
    )
}

const SettingsPrivate = ({screen}) => {
    const {t} = useTranslation();

    if (!!screen && screen.width > 767) {
        return (
            <>
                <Heading text={t("Profile.settings")}/>
                <div className="main-edit-container">
                    <SettingsPrivateForm/>
                    <SettingsSideBar/>
                </div>
            </>
        );
    }

    return <SettingsPrivateForm/>;
}

const mapToProps = ({screen}) => ({screen})

export default connect(mapToProps, null)(SettingsPrivate);
