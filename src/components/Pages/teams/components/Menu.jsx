import {useEffect} from "preact/hooks";
import {Link, NavLink} from "react-router-dom";
import {connect} from "redux-zero/preact";
import {useTranslation} from "react-i18next";
import {api} from '../../../../common/api';
import actions from "../../../../store/actions";
import cn from 'classnames';
import {useIsTeamLeader} from "../../../../store/selectors";
import s from "./Menu.module.scss";


const Menu = ({user, team, invitationsCounter, setInvitationsCounter}) => {
    const {t} = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {invites} = await api.get(`/api_v2/teams/${team.uid}/requests/counts/`);
                setInvitationsCounter(invites || null);
            } catch (e) {
                console.log('error = ', e)
            }
        }
        fetchData();
    }, []);

    const isLeader = useIsTeamLeader({user, team});

    return (
        <div className={s.wrapper}>
            <ul className={s.menu}>
                <li className={s.item}>
                    <NavLink to="/teams/" exact>{t("teams.my")}</NavLink>
                </li>
                {!team && (
                    <li className={s.item}>
                        <NavLink to="/teams/invitations/">{t("teams.invitations")}</NavLink>
                    </li>
                )}
                {!!team && isLeader && (
                    <>
                        <li className={s.item}>
                            <NavLink to="/teams/search/" exact>{t("teams.search")}</NavLink>
                        </li>

                        <li className={cn(s.item, s.borderedLeft)}>
                            <NavLink to="/teams/team-invitations/" exact>{t("teams.TeamInvitations.title")}
                                <span className={s.invitationsCounter}>{invitationsCounter || 0}</span></NavLink>
                        </li>

                        <li className={cn(s.item, s.bordered)}>
                            <NavLink to={`/teams/${team.uid}/update/`} exact>
                                {t("teams.menu.editLink")}

                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.1659 6.11655L13.8826 3.83321C13.5846 3.55329 13.1941 3.39268 12.7854 3.38192C12.3767 3.37117 11.9783 3.51102 11.6659 3.77488L4.16594 11.2749C3.89658 11.5465 3.72886 11.9026 3.69094 12.2832L3.3326 15.7582C3.32138 15.8803 3.33722 16.0033 3.37899 16.1185C3.42076 16.2338 3.48744 16.3384 3.57427 16.4249C3.65214 16.5021 3.74448 16.5632 3.84602 16.6047C3.94755 16.6462 4.05627 16.6672 4.16594 16.6665H4.24094L7.71594 16.3499C8.0966 16.312 8.45263 16.1442 8.72427 15.8749L16.2243 8.37488C16.5154 8.06735 16.6727 7.65697 16.6618 7.23366C16.6508 6.81035 16.4725 6.40864 16.1659 6.11655ZM7.56594 14.6832L5.06594 14.9165L5.29094 12.4165L9.99927 7.76655L12.2493 10.0165L7.56594 14.6832ZM13.3326 8.89988L11.0993 6.66655L12.7243 4.99988L14.9993 7.27488L13.3326 8.89988Z"
                                        fill="#909299"/>
                                </svg>
                            </NavLink>
                        </li>
                    </>
                )}
                {/*<li className={s.item}>*/}
                {/*    <NavLink to="/teams/requests/">Заявки</NavLink>*/}
                {/*</li>*/}
            </ul>

            <div className={s.help}>
                {t("teams.menu.help")}{' '}<Link to="/faq/teams/">FAQ</Link>.
            </div>
        </div>
    );
};

const mapToProps = ({user, team, invitationsCounter, setInvitationsCounter}) => ({user, team, invitationsCounter, setInvitationsCounter});

export default connect(mapToProps, actions)(Menu);
