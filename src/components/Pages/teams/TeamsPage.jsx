import {useEffect, useState} from "preact/hooks";
import Helmet from 'preact-helmet';
import {Switch, Route, Redirect, useLocation} from 'react-router-dom';
import {matchPath} from "react-router";
import {useTranslation} from "react-i18next";
import {connect} from "redux-zero/preact";
import {api, showError} from '../../../common';
import {Spinner} from "../../../common/Components/Spinner";
import Header from '../main/sections/Header';
import Footer from '../main/sections/Footer';
import Team from "./components/Team";
import Search from "./components/Search";
import EmptyTeam from "./components/EmptyTeam";
import BackButton from "../../../common/Components/BackButton";
import TeamForm from "./components/TeamForm";
import Menu from './components/Menu';
import TeamCreatedModal from "./components/TeamCreatedModal";
import actions from "../../../store/actions";
import {useIsTeamLeader} from "../../../store/selectors";
import Invitations from "./components/Invitations/Invitations";
import s from './TeamsPage.module.scss';
import TeamInvitations from "./components/TeamInvitations";


const TeamsPage = ({user, team, setTeam}) => {
    const {t} = useTranslation();
    const {pathname} = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const isLeader = useIsTeamLeader({user, team});

    useEffect(async () => {
        if (isLoading) {
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
        } else {
            const match = matchPath(pathname, {path: "/teams/", exact: true});
            if (match) {
                try {
                    const res = await api.get('/api_v2/teams/my/');
                    if (res.results?.length > 0) {
                        setTeam(res.results[0]);
                    }
                } catch (e) {
                }
            }
        }
    }, [pathname]);

    return (
        <>
            <Helmet title={t("teams.my")}/>
            <Header/>
            <main>
                <section className='profile-container'>
                    {isLoading ? (
                        <Spinner/>
                    ) : (
                        <div className={s.container}>
                            <div>
                                <BackButton/>
                                {!!team ? (
                                    <Switch>
                                        <Route path="/teams/" exact>
                                            <Menu/>
                                            <Team/>
                                        </Route>
                                        {isLeader && (
                                            <>
                                                <Route path={`/teams/${team.uid}/update/`}>
                                                    <TeamForm/>
                                                </Route>
                                                <Route path="/teams/search/">
                                                    <Menu/>
                                                    <Search/>
                                                </Route>
                                                <Route path="/teams/team-invitations/">
                                                    <Menu/>
                                                    <TeamInvitations/>
                                                </Route>
                                            </>
                                        )}
                                        <Redirect to="/"/>
                                    </Switch>
                                ) : (
                                    <Switch>
                                        <Route path="/teams/" exact>
                                            <Menu/>
                                            <EmptyTeam/>
                                        </Route>
                                        <Route path="/teams/create/">
                                            <TeamForm/>
                                        </Route>
                                        <Route path="/teams/invitations/">
                                            <Menu/>
                                            <Invitations/>
                                        </Route>
                                        <Route path="/teams/search/">
                                            <Redirect to="/teams/invitations/"/>
                                        </Route>
                                        <Redirect to="/"/>
                                    </Switch>
                                )}
                            </div>
                        </div>
                    )}
                </section>
            </main>
            <TeamCreatedModal/>
            <Footer/>
        </>
    )
}

const mapToProps = ({user, team}) => ({user, team});

export default connect(mapToProps, actions)(TeamsPage);
