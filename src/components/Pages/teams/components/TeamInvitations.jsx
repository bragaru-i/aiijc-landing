import {useState, useCallback, useEffect, useMemo} from "preact/hooks";
import {connect} from "redux-zero/preact";
import dayjs from "dayjs";
import {useHistory, useLocation} from "react-router-dom";
import cn from 'classnames';
import actions from '../../../../store/actions';
import {showError, showSuccess} from '../../../../common';
import {Icon, api, pluralize} from '../../../../common';
import {useTranslation} from "react-i18next";
import baseStyles from './Users.module.scss';
import Paginator from "../../../../common/Components/Paginator";
import {Spinner} from "../../../../common/Components/Spinner";
import SearchForm from "./SearchForm";
import Card from "./Card";
import Helmet from "preact-helmet";
import Heading from "../../profile/components/Heading";
import s from './SearchUsers.module.scss';
import Modal from "../../../../common/Modal";


const User = ({participant, request, currentUser, user, team, createRequest, deleteRequest, number}) => {
    const {t} = useTranslation();
    const [detailsIsOpened, setDetailsIsOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [deleteRequestModalOpened, setDeleteRequestModalOpened] = useState(false);
    const closeDeleteRequestModal = useCallback(() => setDeleteRequestModalOpened(false), []);
    const openDeleteRequestModal = useCallback(() => setDeleteRequestModalOpened(true), []);

    const isCurrentUser = currentUser.id === user.id;
    const address = [user.address_set?.[0]?.country?.name, user.address_set?.[0]?.city?.name].filter((i) => i).join(', ');
    const name = [user.first_name, user.last_name].filter((i) => i).join(' ') || user.login || '';

    const createRequestCallback = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await api.post(`/api_v2/teams/${team.uid}/requests/create/`, {invitee: user.id});
            createRequest(res);
            showSuccess(t('teams.SearchUsers.requestCreated'));
        } catch (e) {
            showError(e.res?.detail || e.res?.details || e.res?.errors?.any || t('errors.unknown'));
        } finally {
            setIsLoading(false);
        }
    }, [user, team]);

    const deleteRequestCallback = useCallback(async () => {
        if (request) {
            try {
                setIsLoading(true);
                await api.post(`/api_v2/teams/requests/${request.id}/delete/`);
                closeDeleteRequestModal();
                deleteRequest(request);
                showSuccess(t('teams.SearchUsers.requestDeleted'));
            } catch (e) {
                showError(e.res?.detail || e.res?.details || e.res?.errors?.any || t('errors.unknown'));
            } finally {
                setIsLoading(false);
            }
        }
    }, [request, user, team]);

    const toggleDetails = useCallback(({target}) => {
        if (target.closest(`.${baseStyles.top}`) && !target.closest(`.${baseStyles.right}`)) {
            setDetailsIsOpened((isOpened) => !isOpened);
        }
    }, []);

    return (
        <li className={cn(baseStyles.user, {[baseStyles.detailsIsOpened]: detailsIsOpened})} onClick={toggleDetails}>
            <div className={cn(baseStyles.top, s.top, {[baseStyles.isCurrentUser]: isCurrentUser})}>
                <span className={s.number}>{number}</span>

                <img className={baseStyles.avatar} src={user?.cropping || "/static/dist/aiijc/images/participant-default.svg"}
                     alt={name}/>

                <div>
                    <div className={baseStyles.nameWr}>
                        <div className={baseStyles.name} title={name}>
                            {name}
                        </div>
                        <Icon name="chevron-bottom" className={cn(baseStyles.chevron, baseStyles.onlyDesktop)}/>
                    </div>
                    <div className={baseStyles.address}>
                        {address || t("teams.addressDefault")}
                    </div>
                </div>

                <Icon name="chevron-bottom" className={cn(baseStyles.chevron, baseStyles.mobileChevron, s.mobileChevron)}/>

                {!isCurrentUser && !participant && (
                    <div className={cn(baseStyles.right, baseStyles.onlyDesktop)}>
                        {!!request ? (
                            <button className={cn(s.requestBtn, s.deleteBtn)} onClick={openDeleteRequestModal}
                                    disabled={isLoading}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 18.3333C14.6024 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6024 1.66663 10 1.66663C5.39765 1.66663 1.66669 5.39759 1.66669 9.99996C1.66669 14.6023 5.39765 18.3333 10 18.3333Z"
                                        stroke="#FF0000" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                    <path d="M6.66669 10H13.3334" stroke="#FF0000" stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </svg>
                                {t('teams.SearchUsers.cancelInviteBtn')}
                            </button>
                        ) : (
                            <button className={cn(s.requestBtn, s.createBtn)} onClick={createRequestCallback}
                                    disabled={isLoading}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 18.3333C14.6024 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6024 1.66663 10 1.66663C5.39765 1.66663 1.66669 5.39759 1.66669 9.99996C1.66669 14.6023 5.39765 18.3333 10 18.3333Z"
                                        stroke="#06B418" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                    <path d="M10 6.66663V13.3333" stroke="#06B418" stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                    <path d="M6.66669 10H13.3334" stroke="#06B418" stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </svg>
                                {t('teams.SearchUsers.inviteBtn')}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {detailsIsOpened && (
                <div className={baseStyles.bottom}>
                    <ul className={baseStyles.detailsList}>
                        <li className={baseStyles.detailsItem}>
                            <label className={baseStyles.detailsLabel}>{t("teams.birth")}:</label>{' '}
                            <span>{user.birth ? dayjs(user.birth).format('D MMMM YYYY') : t("teams.default")}</span>
                        </li>

                        <li className={baseStyles.detailsItem}>
                            <label className={baseStyles.detailsLabel}>{t("teams.address")}:</label>{' '}
                            <span>{address || t("teams.default")}</span>
                        </li>

                        <li className={baseStyles.detailsItem}>
                            <label className={baseStyles.detailsLabel}>{t("teams.about")}:</label>{' '}
                            <span>{user.userextra?.about || t("teams.default")}</span>
                        </li>
                    </ul>
                </div>
            )}

            {!isCurrentUser && !participant && (
                <div className={cn(baseStyles.mobileMenu, s.mobileMenu)}>
                    {!!request ? (
                        <button className={cn(s.requestBtn, s.deleteBtn)} onClick={openDeleteRequestModal}
                                disabled={isLoading}>
                            {t('teams.SearchUsers.cancelInviteBtn')}
                        </button>
                    ) : (
                        <button className={cn(s.requestBtn, s.createBtn)} onClick={createRequestCallback}
                                disabled={isLoading}>
                            {t('teams.SearchUsers.inviteBtn')}
                        </button>
                    )}
                </div>
            )}

            <Modal isShowing={deleteRequestModalOpened} header={t("teams.deleteRequestModal.header")}
                   onClose={closeDeleteRequestModal}>

                {t("teams.deleteRequestModal.text")}
                <div className={s.leaveTeam}>
                    <button className="btn primary" onClick={deleteRequestCallback}
                            disabled={isLoading}>
                        {t("teams.form.deleteTeamModal.submitBtn")}
                    </button>
                    <button className="btn primary-outline" onClick={closeDeleteRequestModal}>
                        {t("teams.form.deleteTeamModal.closeBtn")}
                    </button>
                </div>
            </Modal>
        </li>
    );
};


const Users = ({setInvitationsCounter, user: currentUser, team}) => {
    const {t} = useTranslation();
    const history = useHistory();
    const location = useLocation();

    const URLParams = new URLSearchParams(location.search);
    const availableFilterPerPage = [5, 10, 20, 30];
    const filterPerPageFromURL = parseInt(URLParams.get('size'));
    const filterPerPage = availableFilterPerPage.find((i) => i === filterPerPageFromURL) || availableFilterPerPage[1];
    const currentPage = Math.min(Math.max(1, parseInt(URLParams.get('page')) || 1), 1_000_000_000);

    const [requestsLoaded, setRequestsLoaded] = useState(false);
    const [requests, setRequests] = useState([]);
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const search = URLParams.get('search') || '';
    const age = Math.max(0, parseInt(URLParams.get('age'))) || '';

    const params = new URLSearchParams({search, age, page: currentPage, size: filterPerPage});
    const validatedURLSearch = params.toString();
    useEffect(() => {
        // history.replace({search: validatedURLSearch});
    }, []);

    const setFilters = useCallback((data) => {
        const prevParams = Object.fromEntries(new URLSearchParams(location.search));
        const URLParams = new URLSearchParams({...prevParams, ...data});
        history.push({search: URLParams.toString()});
    }, [location, history]);

    const setCurrentPage = useCallback((page) => setFilters({page}), [setFilters]);

    const fetchUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await api.get(`/api_v2/participants/?${validatedURLSearch}`);
            setContent(res);
        } catch (e) {
            if (e.status === 404) {
                setContent({"count": 0, "next": null, "previous": null, "results": []});
            } else {
                showError(e.res?.detail || t('teams.SearchUsers.fetchUsersFailed'));
            }
        } finally {
            setIsLoading(false);
        }
    }, [location, validatedURLSearch]);

    const resetFilters = useCallback(() => {
        setFilters({search: '', age: '', page: 1});
    }, [setFilters]);

    const fetchRequests = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await api.get(`/api_v2/teams/${team.uid}/requests/?type=INVITE`);
            setRequests(res.results);
            setInvitationsCounter(res.count);
            setRequestsLoaded(true);
        } catch (e) {
            showError(t('teams.SearchUsers.fetchRequestsFailed'));
        } finally {
            setIsLoading(false);
        }
    }, [team]);

    useEffect(() => {
        fetchRequests();
    }, [team]);

    useEffect(() => {
        fetchUsers();
    }, [team, currentPage, filterPerPage, search, age]);

    const createRequest = useCallback((request) => {
        setRequests((requests) => ([...requests, request]));
    }, []);

    const deleteRequest = useCallback((request) => {
        setInvitationsCounter(requests.length - 1);
        setRequests((requests) => (
            requests.filter(({id}) => id !== request.id)
        ));
    }, [requests]);

    const usersToRequests = useMemo(() => {
        return new Map(requests.map((request) => [request.invitee.id, request]))
    }, [requests]);

    const usersToParticipants = useMemo(() => {
        return new Map(team.participants.map((participant) => [participant.user.id, participant]))
    }, [team]);

    const limit = 5;
    const requestsLeft = Math.max(0, limit - requests.length);

    return (
        <>
            <Helmet title={t("teams.TeamInvitations.title")}/>
            <div className={s.headingWr}>
                <Heading text={t("teams.TeamInvitations.title")} className={s.heading}/>
                {requestsLoaded && (
                    <div className={s.limitText}>
                        <span dangerouslySetInnerHTML={{__html: t('teams.limit.text')}}></span>
                        &nbsp;<span className={s.limit}>{requestsLeft}</span> {pluralize(requestsLeft, t('teams.limit.person.one'), t('teams.limit.person.two'), t('teams.limit.person.five'))}
                    </div>
                )}
            </div>
            <Card>
                {(!content || isLoading) ? (
                    <Spinner/>
                ) : (
                    <>
                        {requests.length > 0 && (
                            <>
                                <ol className={baseStyles.users}>
                                    {requests.map((elem, index) => (
                                        <User user={elem.invitee}
                                              team={team}
                                              createRequest={createRequest}
                                              deleteRequest={deleteRequest}
                                              request={usersToRequests.get(elem.invitee.id)}
                                              participant={usersToParticipants.get(elem.invitee.id)}
                                              currentUser={currentUser}
                                              number={(currentPage - 1) * filterPerPage + index + 1}
                                        />
                                    ))}
                                </ol>
                            </>
                        )}
                        {(!requests || requests.length === 0) && <div>{t("teams.TeamInvitations.noInvitations")}</div>}
                    </>
                )}
            </Card>
        </>
    )
};

const mapToProps = ({user, team, setInvitationsCounter}) => ({user, team, setInvitationsCounter});

export default connect(mapToProps, actions)(Users);
