import {h, Fragment} from 'preact';
import cn from 'classnames';
import {connect} from "redux-zero/preact";
import actions from "../../../store/actions";
import {useTranslation} from 'react-i18next';
import {DownloadIcon, SpinnerIcon} from '../WorkareaIcons';
import {SOLUTION_STATE} from '../../../constants';
import {truncate} from '../../../common/utils';
import dayjs from 'dayjs';
import s from './style.module.scss';


const SolutionCard = ({showModal, setSolutionErrorModalContent, solution, isNotUserChoice}) => {
    const {t} = useTranslation();

    const isError = [
        SOLUTION_STATE.ERROR,
        SOLUTION_STATE.COMPILED_WITH_ERROR,
    ].some(s => s === solution.state_code);

    const showErrorModal = (e, solution) => {
        e.preventDefault();
        setSolutionErrorModalContent({header: solution?.real_filename, error_message: solution?.error_message })
        showModal('solution_error_log');
    }

    return (
        <>
            <div className={cn(s.card, {[s.chosen]: isNotUserChoice && solution.chosen}, {[s.cardError]: isError})}>
                <div className={s.uploaded}>
                    <div className={s.dateWrapper}>
                        {t("Workarea.card.uploaded")}{' '}
                        <span className={s.date}>
                            {dayjs(solution.accepted).format('DD.MM.YYYY HH:mm')}
                        </span>
                    </div>
                </div>

                <div className={s.fileLinkWrapper}>
                    <a href={`/api_v2/solution/${solution.id}/get_solution_file/`} download className={s.fileLink}>
                        <div className={s.fileName} title={solution.real_filename}>{truncate(solution.real_filename, 25)}</div>
                        <DownloadIcon />
                    </a>
                </div>
                <div className={s.comment}>{solution?.comment}</div>
                <div className={s.solution}>
                    {isError ? (
                        <>
                            <div className={s.error}>{truncate(solution.error_message, 150) || t("Workarea.card.unknownError")}</div>
                            {solution.error_message && <div className={s.errorLink}><a href="#" onClick={e => showErrorModal(e, solution)}>{t("Workarea.card.errorLink")}</a></div>}
                        </>
                    ) : (
                            <div className={s.result}>
                                {solution.state_code === SOLUTION_STATE.CHECKING ? (
                                    <div className={s.checkingWrapper}>
                                        <SpinnerIcon className={s.spinnerIcon} /> <span className={s.checking}>{t("Workarea.card.checking")}</span>
                                    </div>
                                ) : (
                                        <>{t("Workarea.card.result")} <span className={s.score}>{solution.score?.private}</span></>
                                    )}
                            </div>
                        )}
                    {isNotUserChoice && solution.chosen && <div className={s.best}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0002 18C14.4185 18 18.0002 14.4183 18.0002 10C18.0002 5.58172 14.4185 2 10.0002 2C5.58197 2 2.00024 5.58172 2.00024 10C2.00024 14.4183 5.58197 18 10.0002 18Z" stroke="#06B418" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.364 8.12134L9.12137 12.364L7.00005 10.2427" stroke="#06B418" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>{t("Workarea.card.best")}</span>
                    </div>}
                </div>
            </div>
        </>
    );
};

const mapToProps = ({showModal, setSolutionErrorModalContent}) => ({showModal, setSolutionErrorModalContent});
export default connect(mapToProps, actions)(SolutionCard);