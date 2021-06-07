import {NavLink} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import {Icon} from '../../../../common/icons'


const SettingsSideBar = () => {
    const {t} = useTranslation();

    return (
        <div className="editNav">
            <NavLink className="editNav-item" to="/settings/general" isActive={(match, location) => {
                const pathArr = location.pathname.split('/').filter(el => el !== "")
                let isActive = false;
                if (pathArr.length === 1 && pathArr[0] === "settings") isActive = true;
                if (pathArr.length === 2 && pathArr[1] === "general") isActive = true
                return isActive
            }}>
                <Icon name="lock-icon" width="20px" style={{color: "#858DA6"}}/>
                <span>{t("Profile.changePassword")}</span>
                <div className="spacer"/>
                <Icon className="editNav--ico2" name="chevron-right" width="12px" fill="#858DA6"/>
            </NavLink>
            <NavLink className="editNav-item" to="/settings/unuscribe">
                <Icon name="mail-icon" width="20px" style={{color: "#858DA6"}}/>
                <span>{t("Profile.subscribes")}</span>
                <div className="spacer"/>
                <Icon className="editNav--ico2" name="chevron-right" width="12px" fill="#858DA6"/>
            </NavLink>
            <NavLink className="editNav-item" to="/settings/private">
                <Icon name="private-icon" className="editNav-item__private-icon" width="20px"
                      style={{color: "#858DA6"}}/>
                <span>{t('Profile.Private.title')}</span>
                <div className="spacer"/>
                <Icon className="editNav--ico2" name="chevron-right" width="12px" fill="#858DA6"/>
            </NavLink>
        </div>
    );
}

export default SettingsSideBar;