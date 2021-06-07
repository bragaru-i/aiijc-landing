import {connect} from 'redux-zero/preact'
import EditGeneralForm from './forms/EditGeneralForm'
import Heading from '../../profile/components/Heading'
import EditSideBar from './EditSideBar'
import {useTranslation} from "react-i18next";
import './edit.scss'


const Edit = ({screen}) => {
    const {t} = useTranslation();

    if (!!screen && screen.width > 767)
        return (
            <>
                <Heading text={t("Profile.edit")}/>
                <div className="main-edit-container">
                    <EditGeneralForm/>
                    <EditSideBar/>
                </div>

            </>
        );

    return (
        <>
            <Heading text={t("Profile.edit")}/>
            <EditSideBar/>
        </>
    );
}

const mapToProps = ({screen}) => ({screen});

export default connect(mapToProps, null)(Edit);
