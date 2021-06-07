import {h, Fragment} from 'preact';
import {useState, useEffect, useCallback} from 'preact/hooks';
import {connect} from 'redux-zero/preact';
import actions from '../../../store/actions';
import {useTranslation} from 'react-i18next';
import SolutionUploader from '../SolutionUploader';
import {api} from '../../../common/api';
import {CHOICES} from '../../../constants';
import {NotebookIcon} from '../WorkareaIcons';
import cn from 'classnames';
import s from './style.module.scss';
import {SolutionsList} from './SolutionsList';


const Workarea = ({task, user}) => {
    const {t} = useTranslation();
    const [data, setData] = useState({results: null});

    const fetchSolutions = useCallback(async () => {
        const res = await api.get(`/api_v2/task/${task.id}/uploaded_solutions/?page_size=10000000`);
        setData(res);
    }, [task]);

    useEffect(() => {
        fetchSolutions();
        const intervalId = setInterval(fetchSolutions, 30 * 1000);
        return () => clearInterval(intervalId);
    }, [task]);

    const solutions = data.results;
    const {upload_status, totals} = data;
    const {current_upload_availability, last_uploaded_solution, attempts_for_today} = upload_status || {};
    const {allowed, reasons} = current_upload_availability || {};
    const {state_code: state} = last_uploaded_solution || {};
    const isNotUserChoice = [CHOICES.PRIVATE, CHOICES.PUBLIC].some((c) => c === task.choice_policy);

    return (
        <>
            <div className={s.wrapper}>
                <div>
                    <div className={cn(s.headerWrapper, s.headerUploadSolution)}>
                        <h3 className={s.header}>{t("Workarea.uploadSolution")}</h3>
                        <div className={s.today}>{t("Workarea.attemptsForToday")} <span>{attempts_for_today}</span></div>
                    </div>

                    {solutions && (
                        <SolutionUploader
                            task={task}
                            allowed={user?.is_manager || allowed}
                            reasons={reasons}
                            lastState={state}
                            fetchSolutions={fetchSolutions}
                        />
                    )}
                </div>

                <div>
                    <div className={s.headerWrapper}>
                        <h3 className={s.header}>{t("Workarea.uploadedSolutions")}</h3>
                        <div className={s.totals}>{totals}</div>
                    </div>

                    <SolutionsList solutions={solutions} isNotUserChoice={isNotUserChoice} />
                </div>
            </div>

            <div className={s.mobileMock}>
                <NotebookIcon/>
                <div className={s.mobileMockText}>{t("Workarea.mobileMockText")}</div>
            </div>
        </>
    );
};

const mapToProps = ({user}) => ({user});

export default connect(mapToProps, actions)(Workarea);
