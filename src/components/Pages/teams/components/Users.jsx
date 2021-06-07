import {useEffect, useState, useCallback} from "preact/hooks";
import {connect} from "redux-zero/preact";
import dayjs from "dayjs";
import cn from 'classnames';
import actions from '../../../../store/actions';
import {pluralize, showError, showSuccess} from '../../../../common';
import {Icon, api} from '../../../../common';
import {useTranslation} from "react-i18next";
import {useIsTeamLeader} from '../../../../store/selectors';
import s from './Users.module.scss';
import Modal from "../../../../common/Modal";


const User = ({isLeaderCurrentUser, currentUser, participant, deleteParticipant, setTeam}) => {
    const {t} = useTranslation();
    const [menuIsOpened, setMenuIsOpened] = useState(false);
    const [detailsIsOpened, setDetailsIsOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [leaveTeamModalOpened, setLeaveTeamModalOpened] = useState(false);
    const closeLeaveTeamModal = useCallback(() => setLeaveTeamModalOpened(false), []);
    const openLeaveTeamModal = useCallback(() => setLeaveTeamModalOpened(true), []);

    const [deleteUserModalOpened, setDeleteUserModalOpened] = useState(false);
    const closeDeleteUserModal = useCallback(() => setDeleteUserModalOpened(false), []);
    const openDeleteUserModal = useCallback(() => setDeleteUserModalOpened(true), []);

    const [leaderModalOpened, setLeaderModalOpened] = useState(false);
    const closeLeaderModal = useCallback(() => setLeaderModalOpened(false), []);
    const openLeaderModal = useCallback(() => setLeaderModalOpened(true), []);

    const isCurrentUser = currentUser.id === participant.user.id;
    const {user, is_leader, uid} = participant;
    const address = [user.address_set?.[0]?.country?.name, user.address_set?.[0]?.city?.name].filter((i) => i).join(', ');
    const name = [user.first_name, user.last_name].filter((i) => i).join(' ') || user.login || '';

    useEffect(() => {
        const onClick = ({target}) => {
            if (!target.closest(`.${s.right}, .${s.btn}`)) {
                setMenuIsOpened(false);
            }
        };

        const onKeyDown = (e) => {
            if (e.key === "Escape" || e.key === "Esc") {
                setMenuIsOpened(false);
            }
        };

        document.addEventListener("click", onClick);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener("click", onClick);
            document.removeEventListener('keydown', onKeyDown);
        }
    }, []);

    const setLeader = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await api.post(`/api_v2/teams/participants/${uid}/set_leader/`);
            closeLeaderModal();
            setMenuIsOpened(false);
            setTeam(res);
            showSuccess(t("teams.newLeader"));
        } catch (e) {
            showError(e.res?.detail || e.res?.details || e.res?.errors?.any || e.res?.errors?.participant || t('errors.unknown'));
        } finally {
            setIsLoading(false);
        }
    }, [uid]);

    const deleteUser = useCallback(async () => {
        try {
            setIsLoading(true);
            await api.post(`/api_v2/teams/participants/${uid}/delete/`);
            closeDeleteUserModal();
            closeLeaveTeamModal();
            setMenuIsOpened(false);
            deleteParticipant(uid);
            if (isCurrentUser) {
                showSuccess(t("teams.successLeave"));
                setTeam(null);
            } else {
                showSuccess(t("teams.successKick"));
            }
        } catch (e) {
            showError(e.res?.detail || e.res?.details || e.res?.errors?.any || e.res?.errors?.participant || t('errors.unknown'));
        } finally {
            setIsLoading(false);
        }
    }, [uid]);

    const toggleDetails = useCallback(({target}) => {
        if (target.closest(`.${s.top}`) && !target.closest(`.${s.right}`)) {
            setDetailsIsOpened((isOpened) => !isOpened);
        }
    }, []);

    const isShowMenu = isLeaderCurrentUser || (!isLeaderCurrentUser && isCurrentUser);

    return (
        <li className={cn(s.user, {[s.detailsIsOpened]: detailsIsOpened})} onClick={toggleDetails}>
            <div className={cn(s.top, {[s.isCurrentUser]: isCurrentUser})}>
                <img className={s.avatar} src={user?.cropping || "/static/dist/aiijc/images/participant-default.svg"}
                     alt={name}/>

                <div>
                    <div className={s.nameWr}>
                        <div className={s.name} title={name}>
                            {name}
                        </div>
                        <Icon name="chevron-bottom" className={cn(s.chevron, s.onlyDesktop)}/>
                    </div>
                    <div className={s.address}>
                        {address || t("teams.addressDefault")}
                    </div>
                </div>

                <div className={s.right}>
                    <Icon name="chevron-bottom" className={cn(s.chevron, s.mobileChevron)}/>

                    {is_leader ? <span className={cn(s.leader, s.onlyDesktop)}>{t("teams.leader")}</span> : (
                        <>
                            {isShowMenu && (
                                <button className={cn(s.btn, s.onlyDesktop)} onClick={() => setMenuIsOpened(true)}>
                                    <svg width="20" height="4" viewBox="0 0 20 4" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2" cy="2" r="2" fill="#909299"/>
                                        <circle cx="10" cy="2" r="2" fill="#909299"/>
                                        <circle cx="18" cy="2" r="2" fill="#909299"/>
                                    </svg>
                                </button>
                            )}

                            {menuIsOpened && (
                                <>
                                    <div className={s.menu}>
                                        {isLeaderCurrentUser && (
                                            <>
                                                <button className={cn(s.btn, s.menuItem)} onClick={openLeaderModal}
                                                        disabled={isLoading}>
                                                    <Icon name="repeat"/>
                                                    {t("teams.setLeader")}
                                                </button>

                                                <button className={cn(s.btn, s.menuItem)} onClick={openDeleteUserModal}
                                                        disabled={isLoading}>
                                                    <Icon name="trash"/>
                                                    {t("teams.deleteUser")}
                                                </button>
                                            </>
                                        )}

                                        {!isLeaderCurrentUser && isCurrentUser && (
                                            <button className={cn(s.btn, s.menuItem)} onClick={openLeaveTeamModal}
                                                    disabled={isLoading}>
                                                <Icon name="leave"/>
                                                {t("teams.leave")}
                                            </button>
                                        )}
                                    </div>

                                    <div className={s.menuBg} onClick={() => setMenuIsOpened(false)}/>
                                    <Modal isShowing={leaveTeamModalOpened} header={t("teams.leaveModal.header")}
                                           onClose={closeLeaveTeamModal}>

                                        {t("teams.leaveModal.text")}
                                        <div className={s.leaveTeam}>
                                            <button className="btn primary" onClick={deleteUser}
                                                    disabled={isLoading}>
                                                {t("teams.form.deleteTeamModal.submitBtn")}
                                            </button>
                                            <button className="btn primary-outline" onClick={closeLeaveTeamModal}>
                                                {t("teams.form.deleteTeamModal.closeBtn")}
                                            </button>
                                        </div>
                                    </Modal>
                                    <Modal isShowing={deleteUserModalOpened} header={t("teams.deleteUserModal.header")}
                                           onClose={closeDeleteUserModal}>

                                        {t("teams.deleteUserModal.text")}
                                        <div className={s.leaveTeam}>
                                            <button className="btn primary" onClick={deleteUser}
                                                    disabled={isLoading}>
                                                {t("teams.form.deleteTeamModal.submitBtn")}
                                            </button>
                                            <button className="btn primary-outline" onClick={closeDeleteUserModal}>
                                                {t("teams.form.deleteTeamModal.closeBtn")}
                                            </button>
                                        </div>
                                    </Modal>
                                    <Modal isShowing={leaderModalOpened} header={t("teams.setLeaderModal.header")}
                                           onClose={closeLeaderModal}>

                                        {t("teams.setLeaderModal.text")}
                                        <div className={s.leaveTeam}>
                                            <button className="btn primary" onClick={setLeader}
                                                    disabled={isLoading}>
                                                {t("teams.form.deleteTeamModal.submitBtn")}
                                            </button>
                                            <button className="btn primary-outline" onClick={closeLeaderModal}>
                                                {t("teams.form.deleteTeamModal.closeBtn")}
                                            </button>
                                        </div>
                                    </Modal>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            {detailsIsOpened && (
                <div className={s.bottom}>
                    <ul className={s.detailsList}>
                        <li className={s.detailsItem}>
                            <label className={s.detailsLabel}>{t("teams.birth")}:</label>{' '}
                            <span>{user.birth ? dayjs(user.birth).format('D MMMM YYYY') : t("teams.default")}</span>
                        </li>

                        <li className={s.detailsItem}>
                            <label className={s.detailsLabel}>{t("teams.address")}:</label>{' '}
                            <span>{address || t("teams.default")}</span>
                        </li>

                        <li className={s.detailsItem}>
                            <label className={s.detailsLabel}>{t("teams.about")}:</label>{' '}
                            <span>{user.userextra?.about || t("teams.default")}</span>
                        </li>
                    </ul>
                </div>
            )}

            <div className={s.mobileMenu}>
                {is_leader ? <span className={s.leader}>{t("teams.leader")}</span> : (
                    <>
                        {isShowMenu && (
                            <button className={cn(s.btn, s.mobileMenuBtn)} onClick={() => setMenuIsOpened(true)}>
                                <svg width="20" height="4" viewBox="0 0 20 4" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="2" cy="2" r="2" fill="#909299"/>
                                    <circle cx="10" cy="2" r="2" fill="#909299"/>
                                    <circle cx="18" cy="2" r="2" fill="#909299"/>
                                </svg>
                            </button>
                        )}
                    </>
                )}
            </div>
        </li>
    );
};


const Users = ({user, team, updateParticipant, deleteParticipant, setTeam}) => {
    const {t} = useTranslation();

    const isLeaderCurrentUser = useIsTeamLeader({user, team});

    const count = team.participants.length;
    const minCount = 3;

    return (
        <>
            <div className={s.header}>
                {t("teams.countParticipantsLabel")}:{' '}
                <span className={cn(s.count, {[s.warning]: count < minCount})}>
                    {count} {pluralize(count, t('teams.countParticipants_1'), t('teams.countParticipants_2'), t('teams.countParticipants_5'))}
                </span>
            </div>

            <ol className={s.users}>
                {team.participants.map((participant) => (
                    <User participant={participant} updateParticipant={updateParticipant}
                          isLeaderCurrentUser={isLeaderCurrentUser} setTeam={setTeam}
                          currentUser={user} deleteParticipant={deleteParticipant}/>
                ))}
            </ol>
        </>
    )
}

const mapToProps = ({user, team}) => ({user, team});

export default connect(mapToProps, actions)(Users);
