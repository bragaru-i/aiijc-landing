import {connect} from 'redux-zero/preact'
import SettingsGeneralForm from './forms/SettingsGeneralForm'
import SettingsSideBar from './SettingsSideBar'
import Heading from '../../profile/components/Heading'
import {useTranslation} from "react-i18next";
import '../../edit/components/edit.scss'


const SettingsGeneral = ({screen}) => {
    const {t} = useTranslation();

    if (!!screen && screen.width > 767) {
        return (
            <>
                <Heading text={t("Profile.settings")}/>
                <div className="main-edit-container">
                    <SettingsGeneralForm/>
                    <SettingsSideBar/>
                </div>
            </>
        );
    }

    return <SettingsGeneralForm/>;
}

const mapToProps = ({screen}) => ({screen})

export default connect(mapToProps, null)(SettingsGeneral)
