import {connect} from 'redux-zero/preact'
import Heading from '../../profile/components/Heading'
import EditSideBar from './EditSideBar'
import EditGeneralForm from './forms/EditGeneralForm'
import {useTranslation} from "react-i18next";
import './edit.scss'


const EditGeneral = ({screen}) => {
    const {t} = useTranslation();

    if (!!screen && screen.width > 767) {
        return (
            <>
                <Heading text={t("Profile.edit")}/>
                <div className="main-edit-container">
                    <EditGeneralForm/>
                    <EditSideBar/>
                </div>

            </>
        );
    }

    return <EditGeneralForm />;
}

const mapToProps = ({screen}) => ({screen})

export default connect(mapToProps, null)(EditGeneral)
