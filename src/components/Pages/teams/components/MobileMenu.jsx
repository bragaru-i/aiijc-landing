import {useCallback, useEffect, useState} from "preact/hooks";
import {connect} from 'redux-zero/preact';
import {Link, NavLink, withRouter} from "react-router-dom";
import cn from 'classnames';
import {useTranslation} from "react-i18next";
import actions from '../../../../store/actions';
import {api, showError} from "../../../../common";
import {Spinner} from "../../../../common/Components/Spinner";
import BackButton from "../../../../common/Components/BackButton";
import {Icon} from '../../../../common';
import {useIsTeamLeader} from "../../../../store/selectors";
import s from "./MobileMenu.module.scss";


const MobileMenu = ({setIsBurgerOpened, setIsTeamsMenuOpened, user, team, setTeam, invitationsCounter}) => {
    const {t} = useTranslation();

    const [isLoading, setIsLoading] = useState(true);
    const isLeader = useIsTeamLeader({user, team});

    const onClose = useCallback(({target}) => {
        if (target.closest(`.${s.item}, .${s.edit}`)) {
            setIsBurgerOpened(false);
            setIsTeamsMenuOpened(false);
        }
    }, []);

    useEffect(async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/api_v2/teams/my/');
            if (res.results?.length > 0) {
                setTeam(res.results[0]);
            }
            setIsLoading(false);
        } catch (e) {
            // если команда не загрузилась то оставляем лоадер
            showError(t("teams.fetchError"));
        }
    }, []);

    return (
        <nav className={cn("menu", s.menu)}>
            <BackButton onClick={() => setIsTeamsMenuOpened(false)} className={s.back}/>

            <div className={s.headerWr}>
                <h3 className={s.header}>{t("teams.my")}</h3>

                {!!team && isLeader && !isLoading && (
                    <NavLink onClick={onClose} className={s.edit} to={`/teams/${team.uid}/update/`} exact>
                        {t("teams.menu.editLink")}
                        <Icon className={s.editIcon} name="edit-pen"/>
                    </NavLink>
                )}
            </div>

            <div className={s.help}>
                {t("teams.menu.help")}{' '}<Link to="/faq/teams/">FAQ</Link>.
            </div>

            {isLoading ? (
                <Spinner/>
            ) : (
                <ol onClick={onClose} className={s.list}>
                    <li className={s.item}>
                        <NavLink to="/teams/" exact>
                            {t("teams.my")}
                            <Icon className={s.chevron} name="chevron-right"/>
                        </NavLink>
                    </li>
                    {!team && (
                        <li className={s.item}>
                            <NavLink to="/teams/invitations/">
                                {t('teams.invitations')}
                                <Icon className={s.chevron} name="chevron-right"/>
                            </NavLink>
                        </li>
                    )}
                    {!!team && isLeader && (
                        <>
                            <li className={s.item}>
                                <NavLink to="/teams/search/" exact>
                                    {t("teams.search")}
                                    <Icon className={s.chevron} name="chevron-right"/>
                                </NavLink>
                            </li>
                            <li className={s.item}>
                                <NavLink to="/teams/team-invitations/" exact>
                                    <span>
                                        {t("teams.TeamInvitations.title")}
                                        <span className={s.mobileInvitationsCounter}>{invitationsCounter || 0}</span>
                                    </span>
                                    <Icon className={s.chevron} name="chevron-right"/>
                                </NavLink>
                            </li>
                        </>
                    )}
                    {/*<li className={s.item}>*/}
                    {/*    <NavLink to="/teams/requests/">Заявки</NavLink>*/}
                    {/*</li>*/}
                </ol>
            )}
        </nav>
    );
};

const mapToProps = ({user, team, invitationsCounter}) => ({user, team, invitationsCounter});

export default withRouter(connect(mapToProps, actions)(MobileMenu));
