import {NavLink} from 'react-router-dom'
import {Icon} from '../../../../common/icons'
import {useTranslation} from "react-i18next";
import '../../edit/components/edit.scss'


const EditSideBar = () => {
    const {t} = useTranslation();

    return (
        <div className="editNav" >
            <NavLink className="editNav-item" to="/edit/general" isActive={(match, location) => {
                const pathArr = location.pathname.split('/').filter(el => el !== "")
                let isActive = false;
                if (pathArr.length === 1 && pathArr[0] === "edit") isActive = true;
                if (pathArr.length === 2 && pathArr[1] === "general") isActive = true
                return isActive
            }}>
                <Icon name="edit-info" width="20px" style={{color: "#858DA6"}} />
                <span>{t("Profile.generalInfo")}</span>
                <div className="spacer" />
                <Icon className="editNav--ico2" name="chevron-right" width="12px" fill="#858DA6" />
            </NavLink>
            {/*<NavLink className="editNav-item" to="/edit/education">*/}
            {/*    <Icon className="ico-edu" name="edit-edu" width="20px" style={{color: "#858DA6"}} />*/}
            {/*    <span>Образование</span>*/}
            {/*    <div className="spacer" />*/}
            {/*    <Icon className="editNav--ico2" name="chevron-right" width="12px" fill="#858DA6" />*/}
            {/*</NavLink>*/}
            <NavLink className="editNav-item" to="/edit/social">
                <Icon name="edit-social" width="20px" style={{color: "#858DA6"}} />
                <span>{t("Profile.social")}</span>
                <div className="spacer" />
                <Icon className="editNav--ico2" name="chevron-right" width="12px" fill="#858DA6" />
            </NavLink>

        </div>
    )
}

export default EditSideBar;
