import {h, Fragment} from 'preact';
import {useState, useEffect, useCallback, useMemo} from 'preact/hooks';
import {Link, useParams, useHistory} from 'react-router-dom';
import {connect} from 'redux-zero/preact';
import cn from 'classnames';
import actions from '../../store/actions';
import {useTranslation} from 'react-i18next';
import {api} from '../../common/api';
import './TaskDetail.scss';
import Header from '../Pages/main/sections/Header';
import Footer from '../Pages/main/sections/Footer';
import {TaskStatus} from './TaskStatus';
import {TaskTabs} from './TaskTabs';
import NotActivated from '../Pages/main/sections/NotActivated';
import Workarea from './Workarea';
import Rating from './Rating/Rating';
import SocialLinks from "../Pages/main/sections/SocialLinks";
import Button from '../../common/Components/Button'
import NotificationSection from '../../common/Components/NotificationSection'

import {useIsTeamLeader} from '../../store/selectors';
import {showError} from '../../common';


const TaskDetail = ({user, tasks, rounds, showModal, team, setTeam, trackRegistration, setTrackRegistration}) => {
    const {id} = useParams();
    const history = useHistory();
    const {t, i18n} = useTranslation();
    const [task, setTask] = useState(null);
    const [nextTask, setNextTask] = useState(null);

    const defaultCurrentTab = localStorage.getItem('currentTaskTab:' + id) || '0';
    const [currentTab, setCurrentTab] = useState(defaultCurrentTab);
    const [bg, setBg] = useState('none');
    const [currentRound, setCurrentRound] = useState(null)

    const isLeader = useIsTeamLeader({user, team});
    const [teamRegisteredTracks, setTeamRegisteredTracks] = useState({
        isLoading: true,
        data: null,
    })

    useEffect(() => {
        if (id && tasks && tasks.length !== 0) {
            setTask(tasks.find(task => task.id == id))
        }
    }, [id, tasks]);

    useEffect(() => {
        if (!user) {
            history.push('/');
        }
    }, [user]);

    useEffect(() => {
        try {
            if (task && rounds) {
                const round = rounds.find(round => round.id === task.round.id);
                setCurrentRound(round)
                const index = round.tasks.findIndex(task => task.id == id);
                setNextTask(round.tasks[index + 1] || round.tasks[0]);
            }
        } catch (err) {
            console.log(err);
        }

        setBg(task && !!task.image ? `linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.3) 0.01%, #000000 100%), url('${task.image}')` : 'none');
    }, [task]);

    // get  team and store to Redux
    useEffect(async () => {
        try {
            const res = await api.get('/api_v2/teams/my/');
            if (res.results?.length > 0) {
                setTeam(res.results[0]);
            }
        } catch (e) {
            showError(t("teams.fetchError"));

        }
    }, []);

    useEffect(async () => {

        if (currentRound?.id) {
            try {
                const res = await api.get(`/api_v2/round/${currentRound.id}/user/tracks/`);
                if (res?.length > 0) {
                    setTeamRegisteredTracks((prevState) => ({
                        ...prevState,
                        isLoading: false,
                        data: [...res]
                    }));
                }

            } catch (e) {
                // если команда не загрузилась то оставляем лоадер
                showError(t("teams.fetchError"));
                console.log('ERROR')
                setTeamRegisteredTracks(() => ({
                    isLoading: true,
                    data: null
                }));

            }
        }
    }, [currentRound?.id, rounds]);

    const localSetCurrentTab = (index, taskId) => {
        localStorage.setItem('currentTaskTab:' + taskId, index);
        setCurrentTab(index);
    };

    const makeDisabled = (event) => {
        event.target.classList.add('disabled');
        setTimeout(() => {
            event.target.classList.remove('disabled');
        }, 2000);
    }


    const userTrackTask = useMemo(() => {
        const trackIds = currentRound?.round_tracks?.filter(
            ({tasks}) =>
                tasks.includes(task.id)).find(el => el.id)?.id
        const isRegistrationForTeam = !!currentRound && currentRound?.participant_type === "TEAM"
        const isRegisteredToTrack = !!currentRound && !!Array.isArray(teamRegisteredTracks.data) && teamRegisteredTracks.data.some(({track_id}) => {
            return currentRound?.round_tracks?.some((el) => el.id === track_id && el.tasks?.includes(task?.id))
        })

       const  roundTrack = currentRound?.round_tracks?.filter(
            ({tasks})=>
            tasks.includes(task.id)).find(el=> el.id)

        const isRegisteredToTeamRound =isRegistrationForTeam && teamRegisteredTracks?.data?.length > 0
        const isRegisteredToThisTrack = isRegistrationForTeam &&  teamRegisteredTracks?.data?.some(({track_id})=> track_id===roundTrack?.id)
        return {
            isRegistrationForTeam,
            isRegisteredToTrack,
            trackIds,
            roundTrack,
            isRegisteredToTeamRound,
            isRegisteredToThisTrack
        }

    }, [currentRound?.id, tasks, teamRegisteredTracks, task, rounds])

    const registerToTrackHandler = useCallback(() => {
        showModal('choose_this_track');
        if (team.uid && userTrackTask.trackIds) {
            return setTrackRegistration(team?.uid, userTrackTask.trackIds)
        }
        return setTrackRegistration(team?.uid, null)

    }, [currentRound, task, userTrackTask.trackIds])

    const isShown = !!(user?.is_active && task && task.is_ready_for_solution && (userTrackTask.isRegistrationForTeam ? userTrackTask.isRegisteredToTrack : true));
    const notificationDisplay = useMemo(() => {
        if
            (team?.participants?.length < 3 && !userTrackTask.isRegisteredToTrack && userTrackTask.isRegistrationForTeam) return t('TaskDetail.teamTermNotification1')
        if (userTrackTask.isRegisteredToTrack && userTrackTask.isRegistrationForTeam) return t('TaskDetail.teamTermNotification2');
        return null
    })
    return (
        <>
            <Header />
            <div
                className={cn('TaskDetail', 'TaskDetailHeader', {TaskDetailHeaderBg: task && !!task.image})}
                style={{backgroundImage: bg}}
            >
                <div className="container">
                    {user && !user.is_active && <NotActivated />}
                    {task && (
                        <>
                            <div className="navigation">
                                <Link to="/">{task.round.name}</Link> /{' '}
                                <Link>{task.name}</Link>
                            </div>

                            <h1 >
                                {userTrackTask?.roundTrack?.name &&
                                    <p>{userTrackTask?.roundTrack?.name}</p>}
                                {task.name}
                            </h1>
                            <div className="subtitle">
                                {userTrackTask.isRegistrationForTeam && <Button
                                    onClick={registerToTrackHandler}
                                    className={cn("btn--task ", {"btn--task_chosen": userTrackTask.isRegisteredToTrack})}
                                    disabled={
                                        (!isLeader && (!userTrackTask.isRegisteredToTrack || !userTrackTask.trackIds)
                                            || (userTrackTask.isRegisteredToTeamRound ? !userTrackTask.isRegisteredToThisTrack : false))}
                                >
                                    {userTrackTask.isRegisteredToTrack ? t('buttons.myTeamTrack') : t('buttons.selectThisTrack')}
                                </Button>}


                                <TaskStatus active={task.is_ready_for_solution} />
                                <div className="subtitleFinish">{t('TaskDetail.dateCompletion')}: <span className="date">
                                    {new Date(task.finish_date).toLocaleDateString(i18n.language)}&nbsp;
                                    {new Date(task.finish_date).toTimeString().substr(0, 5)}</span>
                                </div>

                                {nextTask && nextTask.id && <Link to={`/task/${nextTask.id}/`}
                                    className={cn("nextTask", {"nextTask--extended": task && !!task.image}, {"nextTask--extended2": notificationDisplay})}
                                    onClick={() => localSetCurrentTab('0', nextTask.id)}>
                                    {t('TaskDetail.nextTask')}
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </Link>}
                                <SocialLinks className="socialLinksBlock" />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="container">  {!!notificationDisplay && <NotificationSection>
                {notificationDisplay}
            </NotificationSection>}
            </div>

            <TaskTabs currentTab={currentTab} setCurrentTab={setCurrentTab} taskId={id} isShown={isShown} />
            <SocialLinks className="socialLinksBlockMobile container" />
            <div className="TaskDetail TaskDetailContent container">
                {task && (
                    <>

                        {currentTab === '0' && <div className="taskContent">
                            <div className="description">
                                {task.description && <h5>{t('TaskDetail.taskContent.description')}</h5>}
                                <div dangerouslySetInnerHTML={{__html: task.description}} style={{'margin': '16px 0'}}></div>
                            </div>
                            <div className="data">
                                {task.files?.length !== 0 && <h5>{t('TaskDetail.taskContent.data')}</h5>}
                                <div className="files">
                                    {task.files && task.files.map(file => {
                                        return (
                                            <>
                                                {file.is_active && <div className="file">
                                                    <div className="fileName">{file.display_name}</div>
                                                    <a href={file.file || `/api_v2/task/${task.id}/${file.id}`} download={file.original_name} onClick={makeDisabled}>
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 9L10 13L14 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M10 3L10 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <rect x="4" y="16" width="12" height="2" rx="1" fill="currentColor" />
                                                        </svg>
                                                        {t('TaskDetail.taskContent.download')}
                                                    </a>
                                                </div>}
                                            </>
                                        )
                                    })}
                                </div>

                            </div>
                        </div>}

                        {currentTab === '1' && isShown && <Workarea task={task} />}
                        {currentTab === '2' && <Rating task={task} />}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

const mapToProps = ({user, tasks, rounds, team, trackRegistration}) => ({user, tasks, rounds, team, trackRegistration});
export default connect(mapToProps, actions)(TaskDetail);
