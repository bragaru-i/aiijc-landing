import {connect} from 'redux-zero/preact'
import Heading from '../../profile/components/Heading'
import SettinsSideBar from './SettingsSideBar'
import SettingsGeneralForm from './forms/SettingsGeneralForm'
import {useTranslation} from "react-i18next";
import '../../edit/components/edit.scss'


const Settings = ({screen}) => {
    const {t} = useTranslation();

    if (!!screen && screen.width > 767) {
        return (
            <>
                <Heading text={t("Profile.settings")}/>
                <div className="main-edit-container">
                    <SettingsGeneralForm/>
                    <SettinsSideBar/>
                </div>

            </>
        );
    }

    return (
        <>
            <Heading text={t("Profile.settings")}/>
            <SettinsSideBar/>
        </>
    )
}
const mapToProps = ({screen}) => ({screen})

export default connect(mapToProps, null)(Settings)
