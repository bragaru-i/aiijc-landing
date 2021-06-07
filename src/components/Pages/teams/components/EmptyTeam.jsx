import {useCallback, useState} from 'preact/hooks';
import Helmet from 'preact-helmet';
import {connect} from "redux-zero/preact";
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import cn from 'classnames';
import {api, Checkbox, showError, showSuccess} from "../../../../common";
import Heading from "../../profile/components/Heading";
import actions from '../../../../store/actions';
import Card from "./Card";
import s from './EmptyTeam.module.scss';


const EmptyTeam = ({user, changeUser}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [can_be_invited_in_teams, set_can_be_invited_in_teams] = useState(!!user.can_be_invited_in_teams);

    const onChange = useCallback(async (_, can_be_invited_in_teams) => {
        setIsLoading(true);
        try {
            const data = {can_be_invited_in_teams: !!can_be_invited_in_teams};
            await api.postJson('/api_v2/teams/update_can_be_invited_in_teams/', data);
            set_can_be_invited_in_teams(can_be_invited_in_teams);
            changeUser(data);
            showSuccess(!!can_be_invited_in_teams ? t('teams.empty.successWant') : t('teams.empty.successNotWant'));
        } catch (e) {
            showError(e.res?.detail || e.res?.details || e.res?.errors?.can_be_invited_in_teams?.[0] || t('errors.unknown'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            <Helmet title={t("teams.my")}/>
            <div className={s.headerWr}>
                <Heading text={t("teams.my")} className={s.header}/>
                <Checkbox name="can_be_invited_in_teams" disabled={isLoading}
                          onChange={onChange} value={can_be_invited_in_teams}>
                    {t("teams.canBeInvitedInTeamsLabel")}
                </Checkbox>
            </div>
            <Card heading={t("teams.empty.heading")}
                  text={t("teams.empty.text")}
                  actions={
                      <div className={s.actions}>
                          <Link to="/teams/create/" className="btn primary">{t("teams.empty.createLink")}</Link>
                          <Link to="/teams/search/" className={cn(s.searchLink, "btn primary-outline")}>{t("teams.empty.updateLink")}</Link>
                      </div>
                  }
            />
        </>
    )
}

const mapToProps = ({user}) => ({user});

export default connect(mapToProps, actions)(EmptyTeam);
