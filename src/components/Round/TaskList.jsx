import {connect} from 'redux-zero/preact';
import actions from '../../store/actions';
import {useTranslation} from 'react-i18next';
import Progress from "./Progress";
import RoundDescription from "./RoundDescription";
import Task from './Task';
import './TaskList.scss';


const TaskList = ({round, rounds}) => {
    const {t} = useTranslation();

    return (
        <div className="TaskListWrapper">
            <div className="container">
                <div className="tasks">
                    <h3>{t('TaskList.title')}</h3>
                    {round && round.tasks && round.tasks.map(task => {
                        return (
                           <Task task={task} key={task.id}/>
                        )
                    })}
                    {(round && round.tasks && round.tasks.length === 0 || rounds && rounds.length === 0) &&
                        <p>{t('TaskList.noTasks')}</p>}
                </div>
                <div className="descriptionWrapper">
                    {round.description ? <RoundDescription round={round}/> : <Progress round={round}/>}
                </div>
            </div>
        </div>
    );
};

const mapToProps = ({user, rounds, tasks}) => ({user, rounds, tasks});
export default connect(mapToProps, actions)(TaskList);
