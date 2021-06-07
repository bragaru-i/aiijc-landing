import {Link} from "react-router-dom";
import {connect} from 'redux-zero/preact';
import cn from 'classnames';
import actions from '../../store/actions';
import {useTranslation} from 'react-i18next';
import {TaskStatus} from './TaskStatus';
import './TaskList.scss';
import {useMemo} from "preact/hooks";


const Task = ({task, rounds}) => {
    const {t} = useTranslation();
    const image = task.image;
    const tagText = task.color_tags?.[0]?.tag_text;
    const currentRound =
        useMemo(() => {
            let data = {};
            let roundTrack = [];
            if (task && rounds) {
                data = rounds.find(round => round.id === task.round.id);
                roundTrack = data?.round_tracks?.filter(
                    ({tasks}) => tasks.includes(task.id)
                ).find(el => el.id);
            }
            return {data, roundTrack}
        }, [task, rounds]);

    return (
        <div className={cn('task', {active: task.is_ready_for_solution, 'task-with-background': !!image})}>
            <div className="taskBg" style={{backgroundImage: image ? 'url("' + image + '")' : "none"}} />

            <div className="taskInner">
                <TaskStatus active={task.is_ready_for_solution} />
                {!!currentRound?.roundTrack && (
                    <div className="taskColorTag">
                        {currentRound.roundTrack.name}
                    </div>
                )}
                <div className="taskName">
                    <Link to={`/task/${task.id}/`}>{task.name}</Link>
                </div>
                <div className="taskInfo">
                    <div className="uploaded">
                        {t('TaskList.taskInfo.uploaded')}&nbsp;&nbsp;<span
                            className="counter">{task.solutions_cnt || '-'}</span>
                    </div>
                    <div className="bestRate">
                        {t('TaskList.taskInfo.bestRate')}&nbsp;&nbsp;<span
                            className="counter">{task.best_score || '-'}</span>
                    </div>
                    <div className="moreInfo">
                        <Link to={`/task/${task.id}/`}>{t('TaskList.taskInfo.moreInfoLink')}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapToProps = ({rounds}) => ({rounds});
export default connect(mapToProps, actions)(Task);
