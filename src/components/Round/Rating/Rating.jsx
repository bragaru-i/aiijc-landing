import {h, Fragment} from 'preact';
import {useState, useEffect, useCallback} from 'preact/hooks';
import {connect} from 'redux-zero/preact';
import actions from '../../../store/actions';
import Paginator from '../../../common/Components/Paginator';
import Dashboard from './Dashboard';
import {api} from '../../../common/api';
import {showError} from '../../../common';
import cn from 'classnames';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';
import './Rating.scss';
import {Spinner} from '../../../common/Components/Spinner';

export const RatingComponent = ({task}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterPerPage, setFilterPerPage] = useState(10);
    const [content, setContent] = useState(null);
    const [scrollToPosition, setScrollToPosition] = useState(false);
    const timeout = 30 * 1000;

    const fetchLeaderboard = useCallback(async (isSilentFetch = true) => {
        if (task) {
            try {
                if (!isSilentFetch) setIsLoading(true);
                const res = await api.get(
                    `/api_v2/task/${task.id}/leaderboard?date=${dayjs(new Date()).format('YYYY-MM-DD')}&page=${currentPage}&page_size=${filterPerPage}`
                );
                setContent(res);
                setIsLoading(false);
            } catch (e) {
                if (!navigator.onLine) {
                    if (!isSilentFetch) {
                        showError(t('errors.offline'));
                    }
                } else if ((e.status >= 500 && e.status < 600) || e.status === 404) {
                    setIsLoading(false);
                } else {
                    showError(t('errors.unknown'));
                    setIsLoading(false);
                }
            }
        }
    }, [task, currentPage, filterPerPage]);

    useEffect(() => {
        fetchLeaderboard(false);
        const intervalId = setInterval(fetchLeaderboard, timeout);
        return () => clearInterval(intervalId);
    }, [task, currentPage, filterPerPage]);


    return (
        <>
            {!isLoading && content && content.results && currentPage && filterPerPage && <div className="rating-wrapper">
                <Dashboard content={content} currentPage={currentPage} setCurrentPage={setCurrentPage} scrollToPosition={scrollToPosition} setScrollToPosition={setScrollToPosition} />
                <div className="ratingFooter">
                    <Paginator numPages={Math.ceil(content.totals / filterPerPage)} currentPage={currentPage} setCurrentPage={setCurrentPage} isLoading={isLoading} />
                    <div className="pageFilter">
                        <span className="pageFilterLabel">{t('Rating.filterPerPage')}</span>
                        <span className={cn({active: filterPerPage === 5, disabled: isLoading})} onClick={() => {setCurrentPage(1); setFilterPerPage(5);}}>5</span>
                        <span className={cn({active: filterPerPage === 10, disabled: isLoading})} onClick={() => {setCurrentPage(1); setFilterPerPage(10);}}>10</span>
                        <span className={cn({active: filterPerPage === 20, disabled: isLoading})} onClick={() => {setCurrentPage(1); setFilterPerPage(20);}}>20</span>
                        <span className={cn({active: filterPerPage === 30, disabled: isLoading})} onClick={() => {setCurrentPage(1); setFilterPerPage(30);}}>30</span>
                    </div>
                </div>
            </div>}
            {!isLoading && (!content || !content.results) && <div className="no-rating">
                {!isLoading && <div className="message">
                    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="90" height="90" fill="#D2D6F5"/>
                        <path d="M28.5 48C28.5 47.7239 28.7239 47.5 29 47.5H39C39.2761 47.5 39.5 47.7239 39.5 48V60.5H28.5V48Z" stroke="#1E1EF7" stroke-width="3"/>
                        <path d="M50.5 40C50.5 39.7239 50.7239 39.5 51 39.5H61C61.2761 39.5 61.5 39.7239 61.5 40V60.5H50.5V40Z" stroke="#1E1EF7" stroke-width="3"/>
                        <path d="M39.5 30C39.5 29.7239 39.7239 29.5 40 29.5H50C50.2761 29.5 50.5 29.7239 50.5 30V60.5H39.5V30Z" stroke="#1E1EF7" stroke-width="3"/>
                    </svg>
                    <p className="text">{t('Rating.noRating')}</p>
                </div>}
            </div>}
            {isLoading && <Spinner />}
        </>
    )
}


const mapToProps = ({user, tasks, rounds}) => ({user, tasks, rounds});
export default connect(mapToProps, actions)(RatingComponent);