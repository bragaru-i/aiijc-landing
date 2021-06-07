import {useState, useCallback, useEffect} from 'preact/hooks'
import {connect} from 'redux-zero/preact'
import {useTranslation} from "react-i18next";
import {api, Checkbox} from '../../../../common'
import Button from '../../../../common/Components/Button'
import Heading from '../../profile/components/Heading'
import SettingsSideBar from './SettingsSideBar'
import '../../edit/components/edit.scss'
import './SettingsUnuscribe.scss'


const SettingsUnuscribeForm = () => {
    const {t} = useTranslation();

    const [subscribes, setSubscribes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [inputs, setInputs] = useState({});

    useEffect(async () => {
        try {
            const res = await api.get('/api_v2/profile/subscribe_settings');
            setSubscribes(res);
        } catch (e) {
            alertify.error(t("Profile.subscribesFetchError"));
        }
    }, []);

    useEffect(async () => {
        if (subscribes) {
            let newSubscribes = {};
            subscribes.form.forEach(([name, _]) => {
                newSubscribes[name] = subscribes[name];
            });
            setInputs(subscribes);
        }
    }, [subscribes]);

    const [errors, setErrors] = useState({});

    const onChange = useCallback((name, value) => {
        const newData = {...inputs, [name]: !!value};
        setInputs(newData);
    }, [inputs]);

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        const errors = {};
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            setIsLoading(true);
            await api.patchJson('/api_v2/profile/subscribe_settings/', inputs);
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

    return (
        <>
            <Heading className="header-hide" text={t("Profile.subscribes")}/>
            <div className="container-editForms">
                <div className="edit-form-heading">
                    {t("Profile.subscribes")}
                </div>
                <div className="settings-unuscribe-text">
                    {t("Profile.subscribesHelp")}
                </div>

                {!!subscribes && subscribes.form.map(([name, label]) => (
                    <Checkbox className="settings-checkbox" name={name} onChange={onChange} value={inputs[name]}>
                        {label}
                    </Checkbox>
                ))}

                <div className="settings-unuscribe-button">
                    <Button onClick={onSubmit} fullWidth disabled={isLoading}>
                        {t("Profile.save")}
                    </Button>
                </div>
            </div>

        </>
    )
}

const SettingsUnuscribe = ({screen}) => {
    const {t} = useTranslation();

    if (!!screen && screen.width > 767) {
        return (
            <>
                <Heading text={t("Profile.settings")}/>
                <div className="main-edit-container">
                    <SettingsUnuscribeForm/>
                    <SettingsSideBar/>
                </div>
            </>
        )
    }

    return <SettingsUnuscribeForm/>;
}

const mapToProps = ({screen}) => ({screen});

export default connect(mapToProps, null)(SettingsUnuscribe);
