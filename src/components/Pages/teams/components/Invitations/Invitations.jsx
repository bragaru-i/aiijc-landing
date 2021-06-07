import Helmet from 'preact-helmet';
import {connect} from "redux-zero/preact";
import Heading from "../../../profile/components/Heading";
import actions from "../../../../../store/actions";
import cn from 'classnames';
import {useTranslation} from "react-i18next";
import Card from "../Card";
import {useCallback, useEffect, useState} from "preact/hooks";
import {pluralize, showError} from "../../../../../common";
import {api} from '../../../../../common';
import {Spinner} from "../../../../../common/Components/Spinner";
import {showSuccess} from '../../../../../common';
import baseStyles from '../Users.module.scss';
import s from './Invitations.module.scss';
import {useHistory} from "react-router-dom";
import Users from './Users';


const Team = ({user, request, deleteRequest, setTeam}) => {
    const history = useHistory();
    const {t} = useTranslation();
    const [usersIsVisible, setUsersIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {team} = request;

    const address = [team?.country?.name, team?.city?.name].filter((i) => i).join(', ');
    const name = team.name;

    const acceptRequestCallback = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await api.post(`/api_v2/teams/requests/${request.id}/accept/`);
            history.push('/teams/');
            setTimeout(() => setTeam(res), 0);
            showSuccess(t('teams.Invitations.inviteAccepted'));
        } catch (e) {
            showError(e.res?.detail || e.res?.details || e.res?.errors?.any || t('errors.unknown'));
        } finally {
            setIsLoading(false);
        }
    }, [team]);

    const deleteRequestCallback = useCallback(async () => {
        if (request) {
            try {
                setIsLoading(true);
                await api.post(`/api_v2/teams/requests/${request.id}/delete/`);
                deleteRequest(request);
                showSuccess(t('teams.Invitations.inviteDeleted'));
            } catch (e) {
                showError(e.res?.detail || e.res?.details || e.res?.errors?.any || t('errors.unknown'));
            } finally {
                setIsLoading(false);
            }
        }
    }, [request, user, team]);

    const limit = 5;

    return (
        <li className={baseStyles.user}>
            <div className={cn(baseStyles.top, s.top)}>
                <img className={baseStyles.avatar} src="/static/dist/aiijc/images/team-default.svg"
                     alt={name}/>

                <div>
                    <div className={cn(baseStyles.nameWr, s.nameWr)}>
                        <div className={cn(baseStyles.name, s.name)} title={name}>
                            {name}
                        </div>
                    </div>
                    <div className={s.addressWr}>
                        <div className={cn(baseStyles.address, s.address)}>
                            {address || t("teams.addressDefault")}
                        </div>
                        <div className={s.participantsCount}>{team.participants.length} {t('teams.Invitations.limit.from')} {limit} {pluralize(limit, t('teams.Invitations.limit.one'), t('teams.Invitations.limit.two'), t('teams.Invitations.limit.many'))}</div>
                        <div className={s.participantsCountMobile}>{team.participants.length} / {limit}</div>
                    </div>
                </div>

                <div className={cn(baseStyles.right, baseStyles.onlyDesktop)}>
                    <button className={cn(s.requestBtn, s.acceptBtn)} onClick={acceptRequestCallback}
                            disabled={isLoading}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.0003 18.3337C14.6027 18.3337 18.3337 14.6027 18.3337 10.0003C18.3337 5.39795 14.6027 1.66699 10.0003 1.66699C5.39795 1.66699 1.66699 5.39795 1.66699 10.0003C1.66699 14.6027 5.39795 18.3337 10.0003 18.3337Z"
                                stroke="#06B418" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.66699 10L9 12L13.5 7.5" stroke="#06B418" stroke-width="2" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>

                        {t('teams.Invitations.acceptBtn')}
                    </button>
                    <button className={cn(s.requestBtn, s.deleteBtn)} onClick={deleteRequestCallback}
                            disabled={isLoading}>
                        {t('teams.Invitations.declineBtn')}
                    </button>
                </div>
            </div>

            <div className={baseStyles.bottom}>
                <div className={s.description}>{team.description}</div>
                {usersIsVisible && <Users participants={team.participants}/>}
                <button className={s.showUsersBtn} onClick={() => setUsersIsVisible((isVisible) => !isVisible)}>
                    {usersIsVisible ? t('teams.Invitations.hideLineupBtn') : t('teams.Invitations.showLineupBtn')}
                </button>
            </div>

            <div className={cn(baseStyles.mobileMenu, s.mobileMenu)}>
                <button className={cn(s.requestBtn, s.acceptBtn)} onClick={acceptRequestCallback}
                        disabled={isLoading}>
                    {t('teams.Invitations.acceptBtn')}
                </button>
                <button className={cn(s.requestBtn, s.deleteBtn)} onClick={deleteRequestCallback}
                        disabled={isLoading}>
                    {t('teams.Invitations.declineBtn')}
                </button>
            </div>
        </li>
    );
};

const Invitations = ({team, user, setTeam}) => {
    const {t} = useTranslation();
    const [requests, setRequests] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRequests = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await api.get(`/api_v2/teams/requests/my/?type=INVITE`);
            setRequests(res.results);
        } catch (e) {
            showError(t('teams.Invitations.myRequestsError'));
        } finally {
            setIsLoading(false);
        }
    }, [team]);

    useEffect(() => {
        fetchRequests();
    }, [team]);

    const deleteRequest = useCallback((request) => {
        setRequests((requests) => (
            requests.filter(({id}) => id !== request.id)
        ));
    }, [])

    return (
        <>
            <Helmet title={t('teams.Invitations.title')}/>
            <Heading text={t('teams.Invitations.title')}/>
            <Card>
                {!requests || isLoading ? (
                    <Spinner/>
                ) : (
                    <>
                        {requests.length > 0 ? (
                            <ol className={baseStyles.users}>
                                {requests.map((request) => (
                                    <Team request={request} user={user} setTeam={setTeam}
                                          deleteRequest={deleteRequest}/>
                                ))}
                            </ol>
                        ) : (
                            <div className={s.empty}>
                                {t('teams.Invitations.nothingText')}
                            </div>
                        )}
                    </>
                )}
            </Card>
        </>
    );
}

const mapToProps = ({team, user}) => ({team, user});

export default connect(mapToProps, actions)(Invitations);
