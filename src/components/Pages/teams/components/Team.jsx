import {useCallback, useState} from 'preact/hooks';
import {useTranslation} from "react-i18next";
import Helmet from 'preact-helmet';
import {connect} from "redux-zero/preact";
import shortid from 'shortid';
import Heading from "../../profile/components/Heading";
import {api, Checkbox, showError, showSuccess} from "../../../../common";
import actions from '../../../../store/actions';
import Card from "./Card";
import Users from './Users';
import TeamAvatar from './TeamAvatar';
import {useIsTeamLeader} from "../../../../store/selectors";

import s from './Team.module.scss';


const Team = ({user, team, changeTeam}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [can_receive_requests, set_can_receive_requests] = useState(!!team.can_receive_requests);
    const isLeader = useIsTeamLeader({user, team});

    const onChange = useCallback(async (_, can_receive_requests) => {
        setIsLoading(true);
        try {
            const data = {can_receive_requests: !!can_receive_requests};
            await api.patchJson(`/api_v2/teams/${team.uid}/update/`, data);
            set_can_receive_requests(can_receive_requests);
            changeTeam(data);
            showSuccess(!!can_receive_requests ? t('teams.requestsWant') : t('teams.requestsNotWant'));
        } catch (e) {
            showError(e.res?.detail || e.res?.details || e.res?.errors?.can_receive_requests?.[0] || t('errors.unknown'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    const teamAvatarUrl = team?.cropping && team.cropping + '?id=' + shortid.generate()  
    const isAllowedToChangeAvatar = isLeader || user?.is_manager
    
    return (
        <>
            <Helmet title={t("teams.my")}/>
            <div className={s.headerWr}>
                <Heading text={t("teams.my")} className={s.header}/>
                {isLeader && (
                    <Checkbox name="can_receive_requests" disabled={isLoading}
                              onChange={onChange} value={can_receive_requests}>
                        {t("teams.canReceiveRequestsLabel")}
                    </Checkbox>
                )}
            </div>

            <Card className={s.card}>
                {/*<div className={s.track}>*/}
                {/*    <div className={s.trackHeader}>*/}
                {/*        Трек не выбран*/}
                {/*    </div>*/}

                {/*    <div className={s.trackWarning}>*/}
                {/*        Для выбора 1 из 10 треков командного этапа вам необходимо иметь от 3 до 5 человек в команде*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className={s.cardBody}>
                    <div className={s.mainInfo}>
                        <TeamAvatar isAllowedToChange={isAllowedToChangeAvatar} avatarUrl={teamAvatarUrl} patchUrl={`/api_v2/teams/${team?.uid}/update/`} />
                        <div>
                            <Heading text={team.name || t("teams.nameDefault")} className={s.name}/>
                            <div className={s.description}>
                                {team.description || t("teams.descriptionDefault")}
                            </div>
                        </div>
                    </div>

                    <div className={s.users}>
                        <Users/>
                    </div>
                </div>
            </Card>
        </>
    )
}

const mapToProps = ({user, team}) => ({user, team});

export default connect(mapToProps, actions)(Team);
