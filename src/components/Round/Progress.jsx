import {useState} from 'preact/hooks';
import {useHistory} from "react-router-dom";
import {connect} from 'redux-zero/preact';
import actions from '../../store/actions';
import {useTranslation} from 'react-i18next';
import {isFullFilled} from '../Pages/profile/ProfilePage'
import VerificationModal from "./VerificationModal";
import cn from 'classnames';
import './TaskList.scss';
import './Progress.scss';


const Progress = ({user, round}) => {
    const history = useHistory();
    const {t} = useTranslation();
    const [isShowing, setIsShowing] = useState(false);

    return (
        <>
            <div className="progress">
                <h3>{t('TaskList.progress.title')}</h3>
                <div className="info">
                    <div className="description">
                        <div className="title">{round.name}</div>
                        <div className="subtitle">{t('TaskList.progress.qualification.title')}</div>
                        <p className="text">
                            {t('TaskList.progress.qualification.text')}
                        </p>

                        <div className="tasksQual">
                            {round && round.tasks && round.tasks.map(task => {
                               return (<>
                                    <div className={cn('taskWrapper', {taskWrapperSuccess: task.is_task_passed})}>
                                        <div className="taskName">{task.name}</div>
                                        {task.threshold_score && <div className="taskInfoWrapper">
                                            <div className="points">
                                                <div className="qualPoint">{t('TaskList.progress.thresholdLabel')}&nbsp;<span
                                                    className="success">{task.threshold_score}</span></div>
                                                <div className="userPoint">{t('TaskList.progress.bestScoreLabel')}&nbsp;<span
                                                    className={cn(task.is_task_passed ? 'success' : 'accent')}>
                                                    {task.best_score ? task.best_score : '-'}
                                                </span>
                                                </div>
                                            </div>
                                            {task.is_task_passed &&
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="10" cy="10" r="10" fill="#06B418"/>
                                                <path d="M13.3346 7.5L8.7513 12.0833L6.66797 10" stroke="white"
                                                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>}
                                        </div>}
                                    </div>
                                </>)
                            })}
                        </div>


                        {!user.parent_phone_confirmed && <>
                            <div className="subtitle">{t('TaskList.progress.descriptionTitleProfile')}</div>
                            <p className="text">
                                {t('TaskList.progress.descriptionText')}
                            </p>
                        </>}
                        {user.parent_phone_confirmed && <>
                            {!isFullFilled(user) ? <>
                                <div className="subtitle">{t('TaskList.progress.descriptionTitleProfileUnlocked')}</div>
                                <p className="text">
                                    {t('TaskList.progress.descriptionTextProfileUnlocked')}
                                </p>
                            </> : <>
                                <div
                                    className="subtitle">{t('TaskList.progress.descriptionTitleProfileUnlockedAndFull')}</div>
                                <p className="text"
                                   dangerouslySetInnerHTML={{__html: t('TaskList.progress.descriptionTextProfileUnlockedAndFull')}}/>
                            </>}
                        </>}
                        {!user.parent_phone_confirmed ? (
                            <div className="btn primary" style={{marginTop: '15px'}}
                                 onClick={() => setIsShowing(true)}>
                                {t('Verification.startVerificationBtn')}
                            </div>
                        ) : !isFullFilled(user) ? (
                            <div className="btn primary" style={{marginTop: '15px'}}
                                 onClick={() => history.push('/edit')}>
                                {t('Verification.editProfileBtn')}
                            </div>
                        ) : null}
                    </div>
                    {round && user?.is_active &&
                    <div className="rating">
                        <div className="subtitle">{t('TaskList.progress.ratingPos')}</div>
                        <div className="tasksRating">
                            {round && round.tasks && round.tasks.map(task => {
                                return (
                                    <div className="taskRating">
                                        <div className="points">
                                        <span
                                            className="activePoints">{task.rating_pos || '-'}</span> / {task.rating_cnt || '-'}
                                        </div>
                                        <div className="taskName">{task.name}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>}
                </div>
            </div>
            <VerificationModal isShowing={isShowing} setIsShowing={setIsShowing}/>
        </>
    );
};

const mapToProps = ({user}) => ({user});
export default connect(mapToProps, actions)(Progress);
